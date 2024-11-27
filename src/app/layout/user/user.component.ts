import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { User } from "../../model/user";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { ToggleButtonModule } from "primeng/togglebutton";
import { TagModule } from "primeng/tag";
import { ConfirmationService, MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { SpinnerComponent } from "../../config/components/spinner/spinner.component";
import { UserService } from "../../service/user.service";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { MessagesModule } from "primeng/messages";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { AuthService } from "../../auth/auth.service";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {RadioButtonModule} from "primeng/radiobutton";
import {ChipsModule} from "primeng/chips";
import {PhoneFormatPipe} from "../../config/pipes/phone.format.pipe";
import {TooltipModule} from "primeng/tooltip";
import {MultiSelectModule} from "primeng/multiselect";
import {Permission} from "../../model/permission";
import {Team} from "../../model/team";
import {TeamService} from "../../service/team.service";
import {PermissionService} from "../../service/permission.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    imports: [
        TableModule,
        ButtonModule,
        DialogModule,
        ReactiveFormsModule,
        InputTextModule,
        DropdownModule,
        CalendarModule,
        FormsModule,
        InputMaskModule,
        ToggleButtonModule,
        TagModule,
        ToastModule,
        SpinnerComponent,
        ConfirmDialogModule,
        MessagesModule,
        InputGroupAddonModule,
        NgClass,
        DatePipe,
        NgIf,
        RadioButtonModule,
        ChipsModule,
        PhoneFormatPipe,
        TooltipModule,
        MultiSelectModule
    ],
    providers: [MessageService, ConfirmationService],
    standalone: true
})
export class UserComponent implements OnInit {
    userDialog: boolean = false;
    spinner: boolean = false;

    permissions: Permission[];
    selectedPermissions: Permission[] = [];
    selectedTeam: Team;
    users: User[] = [];
    teams: Team[] = [];
    user: User = new User();

    genders: any[] = [
        { label: 'Masculino', value: 'M' },
        { label: 'Feminino', value: 'F' },
        { label: 'Outro', value: 'U' }
    ];

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private confirmationService: ConfirmationService,
        private teamService: TeamService,
        private permissionService: PermissionService,
        private messageService: MessageService,
    ) { }

    ngOnInit() {
        this.refresh();
        this.loadTeams();
        this.loadPermissions();
    }

    refresh() {
        this.spinner = true;
        this.userService.findAllByTeamId(Number.parseInt(localStorage.getItem("userId"))).subscribe({
            next: (data: User[]) => {
                this.spinner = false;
                this.users = data;
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Erro ao carregar usuários: '${error.error.message}'`
                });
            }
        });
    }

    loadTeams() {
        this.teamService.findAll().subscribe({
            next: (result: any) => {
                this.spinner = false;
                this.teams = result;
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Erro ao carregar equipes: '${error.error.message}'`
                })
            }
        });
    }

    loadPermissions() {
        this.permissionService.findAll().subscribe({
            next: (result: any) => {
                this.spinner = false;
                this.permissions = result;
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Erro ao carregar permissões: '${error.error.message}'`
                })
            }
        });
    }

    saveUser() {
        this.user.id > 0 ? this.updateUser() : this.createUser();
    }

    getSelectedPermissions(userPermissions: string[]): Permission[] {
        return this.permissions.filter(permission =>
            userPermissions.includes(permission.description)
        );
    }

    getSelectedTeam(teamId: number): Team {
        return this.teams.find(team => team.id === teamId);
    }

    editUser(user: User) {
        this.user = { ...user };
        this.selectedPermissions = this.getSelectedPermissions(user.permissions);
        this.selectedTeam = this.getSelectedTeam(user.teamId);
        console.log(this.selectedTeam);
        this.userDialog = true;
    }

    confirmDeleteUser(user: User) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja deletar o usuário?',
            header: 'Confirmação',
            rejectLabel: 'Não', rejectButtonStyleClass: 'p-button-danger',
            acceptLabel: 'Sim', acceptButtonStyleClass: 'p-button-secondary',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteUser(user);
            },
            reject: () => {
            }
        });
    }

    deleteUser(user: User) {
        this.spinner = true;
        this.userService.delete(user.id).subscribe({
            next: () => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Usuário deletado com sucesso.'
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

    createUser() {
        this.spinner = true;
        this.userService.create(this.user).subscribe({
            next: () => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Usuário adicionado com sucesso!'
                });
                this.user = new User();
                this.userDialog = false;
                this.refresh();
            },
            error: (error: any) => {
                this.spinner = false;
                if (Array.isArray(error.error.message)) {
                    error.error.message.forEach((msg: any) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: msg
                        });
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: error.error.message
                    });
                }
            }
        });
    }

    updateUser() {
        this.spinner = true;
        this.userService.update(this.user).subscribe({
            next: () => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Usuário atualizado com sucesso.'
                });
                this.clearUser();
                this.userDialog = false;
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

    printUsers() {
        window.print();
    }

    clearUser() {
        this.user = new User();
        this.selectedPermissions = [];
        this.selectedTeam = null;
    }

    onPermissionsChange() {
        this.user.permissions = this.selectedPermissions.map(permission => permission.description);
    }

    onTeamChange() {
        this.user.teamId = this.selectedTeam.id;
        this.user.team = this.selectedTeam.name;
    }
}
