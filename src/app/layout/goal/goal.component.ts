import {Component, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CurrencyPipe, DatePipe, NgClass, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {ConfirmationService, Footer, Message, MessageService, PrimeTemplate} from "primeng/api";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RadioButtonModule} from "primeng/radiobutton";
import {SpinnerComponent} from "../../config/components/spinner/spinner.component";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {GoalService} from "../../service/goal.service";
import {UserService} from "../../service/user.service";
import {TeamService} from "../../service/team.service";
import {Goal} from "../../model/goal";
import {MultiSelectModule} from "primeng/multiselect";
import {UtilsService} from "../../service/utils.service";
import {CalendarModule} from "primeng/calendar";
import {MessagesModule} from "primeng/messages";
import {User} from "../../model/user";
import {ChartModule} from "primeng/chart";

@Component({
    selector: 'app-goal',
    standalone: true,
    imports: [
        ButtonDirective,
        ConfirmDialogModule,
        DatePipe,
        DialogModule,
        DropdownModule,
        Footer,
        FormsModule,
        InputNumberModule,
        InputTextModule,
        InputTextareaModule,
        PrimeTemplate,
        RadioButtonModule,
        SpinnerComponent,
        TableModule,
        TagModule,
        ToastModule,
        CurrencyPipe,
        MultiSelectModule,
        CalendarModule,
        MessagesModule,
        NgClass,
        NgIf,
        ChartModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './goal.component.html',
    styleUrl: './goal.component.scss'
})
export class GoalComponent implements OnInit {
    spinner: boolean = false;
    goalDialog: boolean = false;
    editing: boolean = false;
    goalList: Goal[] = [];
    goalDateRange!: any;
    sellersString: string[] = [];
    sellers: User[] = [];
    selectedGoal: Goal = new Goal();
    goalChartData: any;
    goalChartOptions: any;

    constructor(
        private userService: UserService,
        private teamService: TeamService,
        private goalService: GoalService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private utilsService: UtilsService,
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh(): void {
        this.selectedGoal = new Goal();
        this.goalDialog = false;
        this.editing = false;
        this.loadGoals();
        this.loadUsers();
    }

    loadGoals() {
        this.spinner = true;
        this.goalService.findAll().subscribe({
            next: (data: any) => {
                this.spinner = false;
                this.goalList = data;
                this.goalList = this.goalList.map(goal => ({
                    ...goal,
                    createdDate: new Date(goal.createdDate),
                    startDate: new Date(goal.startDate),
                    endDate: new Date(goal.endDate)
                }));
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao carregar metas:' + error.error.message
                })
            }
        });
    }

    loadUsers() {
        this.spinner = true;
        this.userService.findAllByTeamId(Number.parseInt(localStorage.getItem("userId"))).subscribe({
            next: (data: any) => {
                this.spinner = false;
                this.sellers = data;
                this.sellersString = data.map((item: any) => item.username);
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao carregar vendedores',
                    detail: error.error.message
                });
            }
        });
    }

    selectGoal(goal: Goal) {
        this.selectedGoal = goal;
        this.goalDialog = true;
        this.editing = true;

        if (this.selectedGoal && this.selectedGoal.goal && this.selectedGoal.currentProgress) {
            const progress = Math.min((this.selectedGoal.currentProgress / this.selectedGoal.goal) * 100, 100);
            const remainingProgress = progress === 0 ? 100 : 100 - progress;

            this.goalChartData = {
                labels: ['Concluído', 'Restante'],
                datasets: [{
                    data: [progress, remainingProgress],
                    backgroundColor: [progress > 0 ? '#4ade80' : '#f87171', '#f87171'],
                    hoverBackgroundColor: [progress > 0 ? '#86efac' : '#fca5a5', '#fca5a5']
                }]
            };

            this.goalChartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem: any) => {
                                return tooltipItem.raw.toFixed(2) + '%';
                            }
                        }
                    }
                }
            };
        }
    }

    saveGoal() {
        if (this.selectedGoal.id > 0) {
            // this.updateGoal();
        } else {
            this.createGoal();
        }
    }

    createGoal() {
        this.spinner = true;
        this.selectedGoal.startDate = this.goalDateRange[0];
        this.selectedGoal.endDate = this.goalDateRange[1];
        this.goalService.create(this.selectedGoal).subscribe({
            next: (data: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Meta salva com sucesso!'
                });
                this.refresh();
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao salvar meta',
                    detail: error.error.message
                });
            }
        });
    }

    confirmDeleteGoal(goal: Goal) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja apagar a meta?',
            header: 'Confirmação',
            rejectLabel: 'Não', rejectButtonStyleClass: 'p-button-danger',
            acceptLabel: 'Sim', acceptButtonStyleClass: 'p-button-secondary',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteGoal(goal);
            },
            reject: () => {
            }
        });
    }

    deleteGoal(goal: Goal) {
        this.spinner = true;
        this.goalService.delete(goal.id).subscribe({
            next: (value: any) => {
                this.spinner = false;
                this.refresh();
            },
            error (error: any) {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao salvar meta',
                    detail: error.error.message
                })
            }
        });
    }

    exportCSV() {
        this.utilsService.exportToCSV(this.goalList, 'Metas');
    }

}
