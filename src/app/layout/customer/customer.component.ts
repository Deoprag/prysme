import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Customer} from "../../model/customer";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {DialogModule} from "primeng/dialog";
import {ChipsModule} from "primeng/chips";
import {DropdownModule} from "primeng/dropdown";
import {DatePipe, JsonPipe, NgClass, NgIf, NgStyle} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {ListboxModule} from "primeng/listbox";
import {InputGroupModule} from "primeng/inputgroup";
import {TooltipModule} from "primeng/tooltip";
import {PhoneFormatPipe} from "../../config/pipes/phone.format.pipe";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {InputNumberModule} from "primeng/inputnumber";
import {PostalCodeService} from "../../service/postal-code.service";
import {SpinnerComponent} from "../../config/components/spinner/spinner.component";
import {CustomerService} from "../../service/customer.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TagModule} from "primeng/tag";
import {MessagesModule} from "primeng/messages";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {AuthService} from "../../auth/auth.service";
import {CustomerStatus} from "../../model/customer-status";
import {MultiSelectModule} from "primeng/multiselect";
import {UtilsService} from "../../service/utils.service";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";

@Component({
    templateUrl: './customer.component.html',
    imports: [
        TableModule,
        ButtonModule,
        DialogModule,
        ReactiveFormsModule,
        ChipsModule,
        InputTextModule,
        DropdownModule,
        DatePipe,
        CalendarModule,
        FormsModule,
        NgIf,
        InputMaskModule,
        ListboxModule,
        InputGroupModule,
        TooltipModule,
        PhoneFormatPipe,
        ToastModule,
        NgStyle,
        InputNumberModule,
        SpinnerComponent,
        ConfirmDialogModule,
        TagModule,
        NgClass,
        MessagesModule,
        InputGroupAddonModule,
        JsonPipe,
        MultiSelectModule
    ],
    providers: [MessageService, ConfirmationService],
    standalone: true
})
export class CustomerComponent implements OnInit {
    customerDialog: boolean = false;
    spinner: boolean = false;

    customers: Customer[];
    statusOptions: any = CustomerStatus.getOptions();
    customer: Customer = new Customer();
    sellers: User[] = [];

    constructor(
        private customerService: CustomerService,
        private authService: AuthService,
        private postalCodeService: PostalCodeService,
        private confirmationService: ConfirmationService,
        private utilsService: UtilsService,
        private userService: UserService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.spinner = true;
        this.customerService.findAll().subscribe({
            next: (data: any) => {
                this.spinner = false;
                this.customers = data;
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Erro ao carregar clientes: '${error.error.message}'`
                });
            }
        });
        this.userService.findAllByTeamId(Number.parseInt(localStorage.getItem('userId'))).subscribe({
            next: (data: any) => {
                this.sellers = data;
            },
            error (error: any) {

            }
        })
    }

    findStatusOption(customerStatus: CustomerStatus): any {
        return this.statusOptions.find((option: any) => option.value === customerStatus);
    }

    saveCustomer() {
        this.customer.id > 0 ? this.updateCustomer() : this.createCustomer();
    }

    editCustomer(customer: Customer) {
        this.customer = {...customer};
        console.log(this.customer.birthFoundationDate instanceof Date);  // Deve retornar true
        this.customerDialog = true;
    }

    exportCSV() {
        this.utilsService.exportToCSV(this.customers, 'Customer');
    }

    confirmDeleteCustomer(customer: Customer) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja deletar o cliente?',
            header: 'Confirmação',
            rejectLabel: 'Não', rejectButtonStyleClass: 'p-button-danger',
            acceptLabel: 'Sim', acceptButtonStyleClass: 'p-button-secondary',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteCustomer(customer);
            },
            reject: () => {
            }
        });
    }

    deleteCustomer(customer: Customer) {
        this.spinner = true;
        this.customerService.delete(customer.id).subscribe({
            next: () => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Cliente deletado com sucesso.'
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

    createCustomer() {
        this.spinner = true;
        this.customerService.create(this.customer).subscribe({
            next: () => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Cliente adicionado com sucesso!'
                });
                this.customer = new Customer();
                this.customerDialog = false;
                this.refresh();
            },
            error: (error: any) => {
                this.spinner = false;
                error.error.message.forEach((msg: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: msg
                    });
                });
            }
        });
    }

    updateCustomer() {
        this.spinner = true;
        this.customerService.update(this.customer).subscribe({
            next: () => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Cliente atualizado com sucesso.'
                });
                this.clearCustomer();
                this.customerDialog = false;
                this.refresh();
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.error.message
                })
            }
        });
    }

    onPhoneAdd(event: any) {
        if (event.value.length < 10 || event.value.length > 11) {
            this.customer.phoneNumbers.pop();
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Digite um número de telefone válido.'
            });
        }

        if (this.customer.phoneNumbers.indexOf(event.value) !== -1
            && this.customer.phoneNumbers.indexOf(event.value) !== this.customer.phoneNumbers.length - 1) {
            this.customer.phoneNumbers.pop();
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Número de telefone já foi adicionado.'
            });
        }
    }

    checkCpfCnpjValue(event: any) {
        let inputValue = event.target.value.replace(/[^0-9]/g, '');
        if (inputValue.length > 14) {
            inputValue = inputValue.substring(0, 14);
        }
        event.target.value = inputValue;
        this.customer.cpfCnpj = inputValue;
    }

    formatCpfCnpj(cpfCnpj: string) {
        if (cpfCnpj.length === 11) {
            cpfCnpj = cpfCnpj.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
        } else if (cpfCnpj.length === 14) {
            cpfCnpj = cpfCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
        } else {
            cpfCnpj = '';
        }
        return cpfCnpj;
    }

    searchPostalCode() {
        const cep = this.customer.address.postalCode.replace(/[^0-9]/g, '');
        this.spinner = true;
        if (cep.length === 8) {
            this.postalCodeService.getPostalCodeInfo(cep).subscribe({
                next: (data: any) => {
                    if (!data.erro) {
                        this.customer.address = {
                            id: this.customer.address.id,
                            number: this.customer.address.number,
                            complement: this.customer.address.complement,
                            country: 'Brasil',
                            postalCode: data.cep,
                            street: data.logradouro,
                            neighborhood: data.bairro,
                            city: data.localidade,
                            state: data.uf
                        };
                    } else {
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Ops...',
                            detail: 'CEP não encontrado. Preencha os campos manualmente.'
                        });
                    }
                    this.spinner = false;
                },
                error() {
                    this.spinner = false;
                }
            });
        }
    }

    clearCustomer() {
        this.customer = new Customer();
    }

    protected readonly CustomerStatus = CustomerStatus;
}
