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
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Contact} from "../../../model/contact";

@Component({
    selector: 'wallet',
    standalone: true,
    imports: [
        ConfirmDialogModule,
        SpinnerComponent,
        ToastModule,
        DragDropModule,
        CommonModule,
        TagModule,
        ChipsModule,
        FormsModule,
        DropdownModule,
        DialogModule,
        InputTextareaModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './wallet.component.html',
    styleUrl: './wallet.component.scss'
})
export class WalletComponent implements OnInit {
    protected readonly CustomerStatus = CustomerStatus;
    subscription!: Subscription;
    spinner: boolean = false;
    showContactDialog: boolean = false;

    customers: Customer[] = [];
    draggedCustomer: Customer;
    selectedCustomer: Customer = new Customer();
    draggedCustomerStatus: CustomerStatus;
    contact: Contact = new Contact();

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
                    detail: `Erro ao carregar clientes: '${error.error.message}'`
                });
            }
        });
    }

    getCustomersByStatus(status: CustomerStatus) {
        return this.customers.filter(customer => customer.customerStatus === status);
    }

    dragStart(customer: Customer) {
        this.draggedCustomer = customer;
        this.draggedCustomerStatus = customer.customerStatus;
    }

    dragEnd() {
        if (this.draggedCustomer && this.draggedCustomer.customerStatus !== this.draggedCustomerStatus) {
            this.spinner = true;
            this.selectedCustomer = this.draggedCustomer
            this.customerService.update(this.draggedCustomer).subscribe({
                next: () => {
                    this.spinner = false;
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Atualizado',
                        detail: 'Cliente requalificado com sucesso!'
                    });
                },
                error: (error: any) => {
                    this.spinner = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: `Erro ao carregar clientes: '${error.error.message}'`
                    });
                },
            });
        }
        this.draggedCustomer = null;
        this.draggedCustomerStatus = null;
    }

    drop(newStatus: CustomerStatus) {
        if (this.draggedCustomer && this.draggedCustomer.customerStatus !== newStatus) {
            switch (newStatus) {
                case CustomerStatus.CONTACT:
                        this.draggedCustomer.customerStatus = newStatus;
                        this.showContactDialog = true;
                    return;

                case CustomerStatus.PRESENTATION:
                        this.draggedCustomer.customerStatus = newStatus;
                        // this.showPresentationDialog = true;
                    return;

                case CustomerStatus.PROPOSAL:
                        this.draggedCustomer.customerStatus = newStatus;
                        // this.showProposalDialog = true;
                    return;

                case CustomerStatus.NEGOTIATION:
                        this.draggedCustomer.customerStatus = newStatus;
                        // this.showNegotiationDialog = true;
                    return;
            }

            this.draggedCustomer.customerStatus = newStatus;
            this.dragEnd();
        }
    }

    saveContactInfo() {
        this.showContactDialog = false;
    }
}
