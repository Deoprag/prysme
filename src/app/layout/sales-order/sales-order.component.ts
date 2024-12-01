import {Component, OnInit, ViewChild} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DatePipe, DecimalPipe, NgClass, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {ConfirmationService, Footer, MessageService, PrimeTemplate, SortEvent} from "primeng/api";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RadioButtonModule} from "primeng/radiobutton";
import {SpinnerComponent} from "../../config/components/spinner/spinner.component";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {AuthService} from "../../auth/auth.service";
import {SalesOrderService} from "../../service/sales-order.service";
import {SalesOrder} from "../../model/sales-order";
import {OrderStatus} from "../../model/order-status";
import {PhoneNumberPipe} from "../../config/pipes/phone.number.pipe";
import {Customer} from "../../model/customer";
import {CustomerService} from "../../service/customer.service";
import {CepPipe} from "../../config/pipes/cep.pipe";
import {CpfCnpjPipe} from "../../config/pipes/cpf.cnpj.pipe";
import {IePipe} from "../../config/pipes/ie.pipe";
import {TooltipModule} from "primeng/tooltip";
import {MultiSelectModule} from "primeng/multiselect";
import {UserService} from "../../service/user.service";
import {UtilsService} from "../../service/utils.service";

@Component({
    selector: 'app-sales-order',
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
        ReactiveFormsModule,
        SpinnerComponent,
        TableModule,
        TagModule,
        ToastModule,
        NgClass,
        DecimalPipe,
        PhoneNumberPipe,
        CepPipe,
        CpfCnpjPipe,
        IePipe,
        NgIf,
        TooltipModule,
        MultiSelectModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './sales-order.component.html',
    styleUrl: './sales-order.component.scss'
})
export class SalesOrderComponent implements OnInit {
    spinner: boolean = false;
    sellers: string[] = [];
    salesOrderDialog: boolean = false;
    salesOrderStatus: any = OrderStatus.getOptions();
    salesOrderList: SalesOrder[] = [];
    selectedSalesOrder: SalesOrder = new SalesOrder();
    selectedCustomer: Customer = new Customer();

    constructor(
        private salesOrderService: SalesOrderService,
        private userService: UserService,
        private utilsService: UtilsService,
        private customerService: CustomerService,
        private confirmationService: ConfirmationService,
        private authService: AuthService,
        private messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.selectedCustomer = new Customer();
        this.selectedSalesOrder = new SalesOrder();
        this.loadSalesOrders();
        this.loadUsers();
    }

    exportCSV() {
        this.utilsService.exportToCSV(this.salesOrderList, 'Pedidos de Venda');
    }

    loadUsers() {
        this.spinner = true;
        this.userService.findAllByTeamId(Number.parseInt(localStorage.getItem("userId"))).subscribe({
            next: (data: any) => {
                this.spinner = false;
                this.sellers = data.map((item: any) => item.username);
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

    loadSalesOrders() {
        this.spinner = true;
        this.salesOrderService.findAllByTeamId(Number.parseInt(localStorage.getItem("userId"))).subscribe({
            next: (data: any) => {
                this.spinner = false;
                this.salesOrderList = data;
                this.salesOrderList = this.salesOrderList.map(order => ({
                    ...order,
                    createdDate: new Date(order.createdDate)
                }));
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao carregar pedidos de venda',
                    detail: error.error.message
                })
            }
        });
    }

    editSalesOrder(salesOrder: SalesOrder) {
        this.spinner = true;
        this.customerService.findById(salesOrder.customerId).subscribe({
            next: (data: any) => {
                this.spinner = false;
                this.selectedCustomer = data;
                this.salesOrderDialog = true;
                this.selectedSalesOrder = salesOrder;
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao carregar cliente',
                    detail: error.error.message
                })
            }
        })
    }

    convertSalesOrderStatus(salesOrderStatus: OrderStatus) {
        return this.salesOrderStatus.find((option: any) => option.value === salesOrderStatus);
    }

    calculateSalesOrderTotal(items: { quantity: number, price: number }[]): number {
        return items.reduce((sum, item) => sum + item.price, 0);
    }

    confirmApproveSalesOrder() {
        if (this.selectedSalesOrder.notes != undefined && this.selectedSalesOrder.notes.length > 10) {
            this.confirmationService.confirm({
                message: 'Tem certeza que deseja aprovar o pedido?',
                header: 'Confirmação',
                rejectLabel: 'Não', rejectButtonStyleClass: 'p-button-danger',
                acceptLabel: 'Sim', acceptButtonStyleClass: 'p-button-secondary',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.selectedSalesOrder.status = OrderStatus.CONFIRMED;
                    this.saveSalesOrder();
                },
                reject: () => {
                }
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Ops...',
                detail: 'Digite um motivo para a aprovação!'
            });
        }
    }

    confirmDisapproveSalesOrder() {
        if (this.selectedSalesOrder.notes != undefined && this.selectedSalesOrder.notes.length > 10) {
            this.confirmationService.confirm({
                message: this.selectedSalesOrder.status === 'CONFIRMED'
                    ? 'Tem certeza que deseja desaprovar o pedido? O pedido já foi liberado.'
                    : 'Tem certeza que deseja desaprovar o pedido?',
                header: 'Operação sem retorno.',
                rejectLabel: 'Não', rejectButtonStyleClass: 'p-button-danger',
                acceptLabel: 'Sim', acceptButtonStyleClass: 'p-button-secondary',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.selectedSalesOrder.status = OrderStatus.CANCELED;
                    this.saveSalesOrder();
                },
                reject: () => {
                }
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Ops...',
                detail: 'Digite um motivo para a desaprovação!'
            });
        }
    }

    saveSalesOrder() {
        this.spinner = true;
        this.salesOrderService.update(this.selectedSalesOrder).subscribe({
            next: (data: any) => {
                this.spinner = false;
                this.salesOrderDialog = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Pedido qualificado com sucesso'
                });
                this.refresh();
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao qualificar pedido!',
                    detail: error.error.message
                });
            }
        })
    }

    protected readonly OrderStatus = OrderStatus;
}
