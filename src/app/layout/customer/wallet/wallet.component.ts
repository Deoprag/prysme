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
import {TagModule} from "primeng/tag";
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Contact} from "../../../model/contact";
import {BadgeModule} from "primeng/badge";
import {ContactType} from "../../../model/contact-type";
import {AuthService} from "../../../auth/auth.service";
import {ContactService} from "../../../service/contact.service";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {TooltipModule} from "primeng/tooltip";

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
        InputTextareaModule,
        BadgeModule,
        InputGroupAddonModule,
        InputGroupModule,
        TooltipModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './wallet.component.html',
    styleUrl: './wallet.component.scss'
})
export class WalletComponent implements OnInit {
    protected readonly CustomerStatus = CustomerStatus;
    spinner: boolean = false;
    contactDialog: boolean = false;
    presentationDialog: boolean = false;
    proposalDialog: boolean = false;
    negotiationDialog: boolean = false;

    customers: Customer[] = [];
    contactOptions: { label: string, value: string }[] = [];
    contactTypes: any = ContactType.getOptions();
    draggedCustomer: Customer;
    selectedCustomer: Customer = new Customer();
    customerStatus: CustomerStatus;
    draggedCustomerStatus: CustomerStatus;
    contact: Contact = new Contact();

    constructor(
        private customerService: CustomerService,
        private messageService: MessageService,
        private authService: AuthService,
        private contactService: ContactService,
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.spinner = true;

        this.contact = new Contact();
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

    getCustomerAddress(customer: Customer) {
        return `${customer.address.neighborhood}, ${customer.address.city} - ${customer.address.state}, ${customer.address.country}`;
    }

    getCustomerPhoneNumber(phoneNumber: string) {
        return phoneNumber.length === 11
            ? `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(2, 7)}-${phoneNumber.substring(7, 11)}`
            : `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(2, 6)}-${phoneNumber.substring(6, 10)}`;
    }

    updateContactOptions() {
        if (this.contact.info.contactType === ContactType.PHONE || this.contact.info.contactType === ContactType.WHATSAPP) {
            this.contactOptions = this.selectedCustomer.phoneNumbers.map(phone => ({
                label: this.getCustomerPhoneNumber(phone),
                value: phone
            }));
            this.contact.info.value = this.selectedCustomer.phoneNumbers[0];
        } else if (this.contact.info.contactType === ContactType.EMAIL) {
            this.contactOptions = [{label: this.selectedCustomer.email, value: this.selectedCustomer.email}];
            this.contact.info.value = this.selectedCustomer.email;
        } else {
            this.contactOptions = [];
        }
    }

    dragStart(customer: Customer) {
        this.draggedCustomer = customer;
        this.selectedCustomer = customer;
        this.draggedCustomerStatus = customer.customerStatus;
    }

    drop(newStatus: CustomerStatus) {
        this.customerStatus = this.draggedCustomer.customerStatus;
        if (this.draggedCustomer && this.draggedCustomer.customerStatus !== newStatus) {
            this.draggedCustomer.customerStatus = newStatus;
            switch (newStatus) {
                case CustomerStatus.NEW:
                    this.saveCustomer();
                    return;
                case CustomerStatus.CONTACT:
                    this.contactDialog = true;
                    return;

                case CustomerStatus.PRESENTATION:
                    this.presentationDialog = true;
                    return;

                case CustomerStatus.PROPOSAL:
                    this.proposalDialog = true;
                    return;

                case CustomerStatus.NEGOTIATION:
                    this.negotiationDialog = true;
                    return;
            }
        }
    }

    saveCustomer() {
        this.spinner = true;

        this.customerService.update(this.draggedCustomer).subscribe({
            next: (response: any) => {
                this.spinner = false;
                this.refresh();
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
                    detail: `Erro ao requalificar cliente: '${error.error.message}'`
                });
            }
        })
    }

    saveContact() {
        this.spinner = true;

        this.contact.sellerId = Number.parseInt(localStorage.getItem("userId"));
        this.contact.customerId = this.draggedCustomer.id;
        this.contact.customerStatus = CustomerStatus.CONTACT;
        this.contact.contactDate = new Date();

        this.contactService.create(this.contact).subscribe({
            next: (response: any) => {
                this.spinner = false;
                this.contactDialog = false;
                this.refresh();
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
                    detail: `Erro ao requalificar cliente: '${error.error.message}'`
                });
            }
        })
    }

    closeDialog(dialog: string) {
        this.draggedCustomer.customerStatus = this.customerStatus;
        switch (dialog) {
            case CustomerStatus.CONTACT:
                this.contactDialog = false;
                return;

            case CustomerStatus.PRESENTATION:
                this.presentationDialog = true;
                return;

            case CustomerStatus.PROPOSAL:
                this.proposalDialog = true;
                return;

            case CustomerStatus.NEGOTIATION:
                this.negotiationDialog = true;
                return;
        }
    }

    truncateText(text: string, maxLength: number) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
}
