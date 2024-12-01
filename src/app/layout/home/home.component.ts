import {Component, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/service/app.layout.service';
import {Task} from "../../model/task";
import {TaskService} from "../../service/task.service";
import {AuthService} from "../../auth/auth.service";
import {MessageService} from "primeng/api";
import {lastValueFrom} from "rxjs";
import {GoalService} from "../../service/goal.service";
import {Goal} from "../../model/goal";

@Component({
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    loader: boolean = false;
    taskDialog: boolean = false;
    today: Date = new Date();
    tasks: Task[] = [];
    selectedTask: Task = new Task();
    goal: Goal;
    goalChartData: any;
    goalChartOptions: any;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private taskService: TaskService,
        private messageService: MessageService,
        private goalService: GoalService,
    ) {}

    ngOnInit() {
        this.refresh();
    }

    async refresh(): Promise<void> {
        this.loader = true;
        try {
            await Promise.all([
                this.loadTasks(),
                this.getCurrentGoal(),
            ]);
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: `Erro ao carregar os dados: '${error.message || error}'`
            });
        } finally {
            this.loader = false;
        }
    }

    truncateText(text: string, maxLength: number) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    async getCurrentGoal(): Promise<void> {
        try {
            this.goal = await lastValueFrom(
                this.goalService.findCurrentGoalByUsername(this.authService.getUsername())
            );
            if (this.goal) {
                const progress = (this.goal.currentProgress / this.goal.goal) * 100;

                this.goalChartData = {
                    labels: ['Concluído', 'Restante'],
                    datasets: [{
                        data: [progress, 100 - progress],
                        backgroundColor: ['#4ade80', '#f87171'],
                        hoverBackgroundColor: ['#86efac', '#fca5a5']
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
        } catch (error) {
            throw new Error(error.error?.message || 'Erro ao carregar metas');
        }
    }

    async loadTasks(): Promise<void> {
        try {
            this.tasks = await lastValueFrom(
                this.taskService.findAllByUsername(this.authService.getUsername(), this.today)
            );
        } catch (error) {
            throw new Error(error.error?.message || 'Erro ao carregar tarefas');
        }
    }

    showTask(task: Task) {
        this.selectedTask = {...task};
        this.taskDialog = true;
    }
}
