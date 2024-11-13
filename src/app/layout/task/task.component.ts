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
        InputTextareaModule
    ],
    providers: [MessageService, ConfirmationService],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
    spinner: boolean = false;
    taskDialog: boolean = false;
    date: Date = new Date();
    task: Task = new Task();
    tasks!: Task[];

    constructor(
        private authService: AuthService,
        private taskService: TaskService,
        private messageService: MessageService,
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
        this.taskDialog = false;
    }

    saveTask(task: Task) {
        this.task.id > 0 ? this.updateTask(task) : this.createTask(task);
    }

    createTask(task: Task) {
        this.spinner = true;
        this.task.userId = Number.parseInt(localStorage.getItem("userId"));
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

    }

    truncateText(text: string, maxLength: number) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
}
