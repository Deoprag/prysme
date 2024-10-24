import {Component, OnInit} from '@angular/core';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SpinnerComponent} from "../../../config/components/spinner/spinner.component";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {DragDropModule} from "primeng/dragdrop";
import {Customer} from "../../../model/customer";
import {CustomerStatus} from "../../../model/customer-status";
import {CustomerService} from "../../../service/customer.service";
import {CommonModule} from "@angular/common";
import {debounceTime, Subscription} from "rxjs";
import {LayoutService} from "../../../service/app.layout.service";
import {TagModule} from "primeng/tag";

@Component({
    selector: 'sales-funnel',
    standalone: true,
    imports: [
        ConfirmDialogModule,
        SpinnerComponent,
        ToastModule,
        DragDropModule,
        CommonModule,
        TagModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './sales-funnel.component.html',
    styleUrl: './sales-funnel.component.scss'
})
export class SalesFunnelComponent implements OnInit {
    protected readonly CustomerStatus = CustomerStatus;
    subscription!: Subscription;
    spinner: boolean = false;

    customers: Customer[] = [];
    draggedCustomer: Customer;

    constructor(
        private customerService: CustomerService,
        private messageService: MessageService,
        public layoutService: LayoutService
    ) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
            });
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
                    detail: `Erro ao carregar clientes: '${error.error}'`
                });
            }
        });
    }

    getCustomersByStatus(status: CustomerStatus) {
        return this.customers.filter(customer => customer.customerStatus === status);
    }

    dragStart(customer: any) {
        this.draggedCustomer = customer;
    }

    dragEnd() {
        this.draggedCustomer = null;
    }

    drop(newStatus: CustomerStatus) {
        if (this.draggedCustomer) {
            this.draggedCustomer.customerStatus = newStatus;
            this.dragEnd();
        }
    }
}
