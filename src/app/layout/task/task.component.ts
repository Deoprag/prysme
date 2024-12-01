import {Component, OnInit} from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SpinnerComponent} from "../../config/components/spinner/spinner.component";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {TaskService} from "../../service/task.service";
import {Task} from "../../model/task";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {CustomerStatus} from "../../model/customer-status";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {TableModule} from "primeng/table";
import {Customer} from "../../model/customer";

@Component({
  selector: 'app-task',
  standalone: true,
    imports: [
        CalendarModule,
        ConfirmDialogModule,
        SpinnerComponent,
        ToastModule,
        FormsModule,
        DatePipe,
        NgIf,
        NgForOf,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        TableModule
    ],
    providers: [MessageService, ConfirmationService],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
    spinner: boolean = false;
    isViewing: boolean = false;
    taskDialog: boolean = false;
    date: Date = new Date();
    task: Task = new Task();
    tasks!: Task[];

    constructor(
        private authService: AuthService,
        private taskService: TaskService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.spinner = true;
        this.taskService.findAllByUsername(this.authService.getUsername(), this.date).subscribe({
            next: (response: any) => {
                this.spinner = false;
                this.tasks = response;
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Erro ao carregar dados: '${error.error.message}'`
                });
            }
        });
    }

    showDialog(task: Task) {
        this.task = {...task};
        this.taskDialog = true;
    }

    closeDialog() {
        this.refresh();
        this.task = new Task();
        this.isViewing = false;
        this.taskDialog = false;
    }

    saveTask(task: Task) {
        this.task.id > 0 ? this.updateTask(task) : this.createTask(task);
    }

    createTask(task: Task) {
        this.spinner = true;
        this.task.userId = Number.parseInt(localStorage.getItem("userId"));
        this.task.dueDate = this.date;
        this.taskService.create(task).subscribe({
            next: (response: any) => {
                this.spinner = false;
                this.closeDialog();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Tarefa criada com sucesso.'
                });
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.error.message
                });
            }
        });
    }

    updateTask(task: Task) {
        this.spinner = true;
        this.taskService.update(task).subscribe({
            next: (response: any) => {
                this.spinner = false;
                this.closeDialog();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Tarefa atualizada com sucesso.'
                });
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.error.message
                });
            }
        });
    }

    deleteTask(task: Task) {
        this.spinner = true;
        this.taskService.delete(task.id).subscribe({
            next: () => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Tarefa deletada com sucesso.'
                });
                this.refresh();
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.error.message
                });
            }
        });
    }

    truncateText(text: string, maxLength: number) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    isTaskEditable(dueDate: Date): boolean {
        const today = new Date();
        const taskDate = new Date(dueDate);

        return taskDate.getFullYear() > today.getFullYear() ||
            (taskDate.getFullYear() === today.getFullYear() &&
                taskDate.getMonth() > today.getMonth()) ||
            (taskDate.getFullYear() === today.getFullYear() &&
                taskDate.getMonth() === today.getMonth() &&
                taskDate.getDate() >= today.getDate());
    }

    confirmDeleteTask(task: Task) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja deletar a tarefa?',
            header: 'Confirmação',
            rejectLabel: 'Não', rejectButtonStyleClass: 'p-button-danger',
            acceptLabel: 'Sim', acceptButtonStyleClass: 'p-button-secondary',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteTask(task);
            },
            reject: () => {
            }
        });
    }

    showTask(task: Task) {
        this.showDialog(task);
        this.isViewing = true;
    }
}
