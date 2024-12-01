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
import {CpfCnpjPipe} from "../../../config/pipes/cpf.cnpj.pipe";
import {CepPipe} from "../../../config/pipes/cep.pipe";
import {PhoneNumberPipe} from "../../../config/pipes/phone.number.pipe";
import {AccordionModule} from "primeng/accordion";
import {OrderByPipe} from "../../../config/pipes/order.by.pipe";
import {IePipe} from "../../../config/pipes/ie.pipe";
import {PickListModule} from "primeng/picklist";
import {InputNumberModule} from "primeng/inputnumber";
import {Product} from "../../../model/product";
import {Quotation} from "../../../model/quotation";
import {ProductService} from "../../../service/product.service";
import {StepperModule} from "primeng/stepper";
import {TableModule} from "primeng/table";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {ItemProduct} from "../../../model/item-product";
import {CheckboxModule} from "primeng/checkbox";
import {QuotationService} from "../../../service/quotation.service";
import {TabViewModule} from "primeng/tabview";
import {SalesOrder} from "../../../model/sales-order";
import {NF} from "../../../model/nf";
import {NFService} from "../../../service/nf.service";
import {SalesOrderService} from "../../../service/sales-order.service";
import {DiscountType} from "../../../model/discount-type";
import {NFStatus} from "../../../model/nfstatus";
import {Ripple} from "primeng/ripple";

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
        TooltipModule,
        CpfCnpjPipe,
        CepPipe,
        PhoneNumberPipe,
        AccordionModule,
        OrderByPipe,
        IePipe,
        PickListModule,
        InputNumberModule,
        StepperModule,
        TableModule,
        IconFieldModule,
        InputIconModule,
        CheckboxModule,
        TabViewModule,
        Ripple,
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './wallet.component.html',
    styleUrl: './wallet.component.scss'
})
export class WalletComponent implements OnInit {
    spinner: boolean = false;
    isUnproductive: boolean = false;
    clientDialog: boolean = false;
    contactDialog: boolean = false;
    presentationDialog: boolean = false;
    proposalDialog: boolean = false;
    negotiationDialog: boolean = false;
    editQuotation: boolean = false;
    editSalesOrder: boolean = false;
    selectedQuotation: boolean = false;
    selectedSalesOrder: boolean = false;

    active: number | undefined = 0;
    customers: Customer[] = [];
    products: Product[] = [];
    quotation: Quotation = new Quotation();
    quotationList: Quotation[] = [];
    salesOrderList: SalesOrder[] = [];
    salesOrder: SalesOrder = new SalesOrder();
    nf: NF = new NF();
    nFList: NF[] = [];
    selectedProducts: Product[] = [];
    quotationProducts: ItemProduct[] = [];
    salesOrderProducts: ItemProduct[] = [];
    contactOptions: { label: string, value: string }[] = [];
    statusOptions: any = CustomerStatus.getOptions();
    contactTypes: any = ContactType.getOptions();
    discountTypes: any = DiscountType.getOptions();
    draggedCustomer: Customer;
    selectedCustomer: Customer = new Customer();
    customerStatus: CustomerStatus;
    draggedCustomerStatus: CustomerStatus;
    contact: Contact = new Contact();
    contactList: Contact[] = [];

    constructor(
        private customerService: CustomerService,
        private messageService: MessageService,
        private quotationService: QuotationService,
        private salesOrderService: SalesOrderService,
        private nFService: NFService,
        private confirmationService: ConfirmationService,
        private authService: AuthService,
        private productService: ProductService,
        private contactService: ContactService,
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    findStatusOption(customerStatus: CustomerStatus): any {
        return this.statusOptions.find((option: any) => option.value === customerStatus);
    }

    async refresh() {
        this.spinner = true;
        this.isUnproductive = false;
        this.selectedQuotation = false;
        this.selectedSalesOrder = false;
        this.active = 0;
        this.customers = [];
        this.products = [];
        this.quotation = new Quotation();
        this.quotationList = [];
        this.salesOrder = new SalesOrder();
        this.salesOrderList = [];
        this.nf = new NF();
        this.nFList = [];
        this.selectedProducts = [];
        this.quotationProducts = [];
        this.salesOrderProducts = [];
        this.selectedCustomer = new Customer();
        this.contact = new Contact();
        this.contactList = [];

        try {
            await Promise.all([this.findAllProducts(), this.findAllCustomers()]);
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: `Erro ao recarregar dados: '${error.error?.message || 'Erro desconhecido'}'`
            });
        } finally {
            this.spinner = false;
        }
    }

    async findAllProducts() {
        return new Promise<void>((resolve, reject) => {
            this.productService.findAll().subscribe({
                next: (data: any) => {
                    this.products = data;
                    resolve();
                },
                error: (error: any) => {
                    reject(error);
                }
            });
        });
    }

    async findAllCustomers() {
        return new Promise<void>((resolve, reject) => {
            this.customerService.findAllBySellerId(Number.parseInt(localStorage.getItem('userId'))).subscribe({
                next: (data: any) => {
                    this.customers = data;
                    resolve();
                },
                error: (error: any) => {
                    reject(error);
                }
            });
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
            this.contactOptions = [
                {label: 'Presencialmente', value: 'Presencialmente'},
                {label: 'Outro', value: 'Outro'}
            ];
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
                    this.saveNew();
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
                    this.checkIfItsAbleToNegotiate();
                    return;

                case CustomerStatus.DELETED:
                    this.contactDialog = true;
                    return;
            }
        }
    }

    checkIfItsAbleToNegotiate() {
        this.spinner = true;
        this.salesOrderService.findAllByCustomerId(this.selectedCustomer.id).subscribe({
            next: (data: any) => {
                this.spinner = false;
                const hasConfirmedOrder = data.some((order: any) => order.status === 'CONFIRMED');
                if (hasConfirmedOrder) {
                    this.negotiationDialog = true;
                } else {
                    this.refresh();
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Ops...',
                        detail: 'O cliente não possui pedidos de venda liberado.'
                    })
                }
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

    saveNew() {
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
        this.contact.customerId = this.selectedCustomer.id;
        this.contact.customerStatus = CustomerStatus.CONTACT;

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

    async saveContactAsync() {
        this.spinner = true;

        this.contact.sellerId = Number.parseInt(localStorage.getItem("userId"));
        this.contact.customerId = this.selectedCustomer.id;
        if (this.isUnproductive) {
            this.contact.customerStatus = CustomerStatus.LOST;
        }
        if (this.presentationDialog) {
            this.contact.customerStatus = CustomerStatus.PRESENTATION;
        }
        if (this.proposalDialog) {
            this.contact.customerStatus = CustomerStatus.PROPOSAL;
        }
        if (this.negotiationDialog) {
            this.contact.customerStatus = CustomerStatus.NEGOTIATION;
        }

        return new Promise<void>((resolve, reject) => {
            this.contactService.create(this.contact).subscribe({
                next: (response: any) => {
                    resolve();
                },
                error: (error: any) => {
                    reject(error);
                }
            })
        });
    }

    closeDialog(dialog: string) {
        if (this.customerStatus) this.draggedCustomer.customerStatus = this.customerStatus;
        switch (dialog) {
            case CustomerStatus.CONTACT:
                this.contactDialog = false;
                return;

            case CustomerStatus.PRESENTATION:
                this.presentationDialog = false;
                return;

            case CustomerStatus.PROPOSAL:
                this.proposalDialog = false;
                return;

            case CustomerStatus.NEGOTIATION:
                this.negotiationDialog = false;
                return;

            case CustomerStatus.DELETED:
                this.contactDialog = false;
                return;
        }
        this.refresh();
    }

    truncateText(text: string, maxLength: number) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    loadContacts() {
        this.spinner = true;
        this.contactService.findAllByCustomerId(this.selectedCustomer.id).subscribe({
            next: (response: any) => {
                this.spinner = false;
                this.contactList = response;
                this.clientDialog = true;
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Erro ao carregar contatos: '${error.error.message}'`
                })
            }
        })
    }

    addItemToQuotation(event: any) {
        event.items.forEach((product: any) => {
            this.quotation.items.push({
                id: 0, nfId: 0, product: "", quotationId: 0, salesOrderId: 0,
                productId: product.id,
                price: product.price,
                quantity: 1
            });
        });
    }

    onProductsRemoved(event: any) {
        event.items.forEach((product: any) => {
            const index = this.quotation.items.findIndex(item => item.productId === product.id);
            if (index !== -1) {
                this.quotation.items.splice(index, 1);
            }
        });
    }

    changeItemQuantity(product: Product, event: any) {
        const existingItem = this.findProduct(product);

        if (existingItem) {
            existingItem.quantity = event.value;
        }
    }

    containsLetters(value: string): boolean {
        const regex = /[a-zA-Z]/;
        return regex.test(value);
    }

    sumQuotationValue(): number {
        let total = 0;
        this.quotation.items.forEach((product: any) => {
            if (product.quantity > 0 && product.price > 0) {
                total += product.price * product.quantity;
            }
        })
        return total;
    }

    containsItem(product: Product): boolean {
        return this.quotation.items.some((item: any) => item.productId === product.id);
    }

    findProduct(product: Product) {
        return this.quotation.items.find(item => item.productId === product.id);
    }

    isContactValid() {
        return !!(
            this.contact &&
            this.contact.notes &&
            this.contact.notes.length >= 10 &&
            this.contact.info &&
            this.contact.info.value &&
            this.contact.info.value.length > 0 &&
            this.contact.info.contactType
        );
    }

    saveQuotation() {
        console.log(this.quotation);
        if (this.quotation.id > 0) {
            this.updateQuotation();
        } else {
            this.saveQuotationAsync();
        }
    }

    updateQuotation() {
        this.spinner = true;
        this.quotationService.update(this.quotation).subscribe({
            next: (data: any) => {
                this.spinner = false;
                this.editQuotation = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Orçamento salvo com sucesso!'
                });
                this.loadQuotations();
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Erro ao salvar orçamento: '${error.error?.message || 'Erro desconhecido'}'`
                })
            }
        });
    }

    async saveQuotationAsync() {
        this.spinner = true;
        this.quotation.sellerId = Number.parseInt(localStorage.getItem("userId"));
        this.quotation.customerId = this.selectedCustomer.id;

        return new Promise<void>((resolve, reject) => {
            this.quotationService.create(this.quotation).subscribe({
                next: (data: any) => {
                    this.spinner = false;
                    resolve();
                },
                error: (error: any) => {
                    reject(error);
                }
            });
        });
    }

    async savePresentation() {
        this.spinner = true;

        if (this.isContactValid()) {
            try {
                await Promise.all([this.saveContactAsync(), this.saveQuotationAsync()]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Contato e orçamento salvos com sucesso!'
                });
                this.closeDialog(CustomerStatus.PRESENTATION);
                await this.refresh();
            } catch (error) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Erro ao salvar conato: '${error.error?.message || 'Erro desconhecido'}'`
                });
            } finally {
                this.spinner = false;
            }
        } else {
            this.spinner = false;
            this.messageService.add({
                severity: 'warn',
                summary: 'Ops...',
                detail: `Preencha os dados de contato!`
            })
        }
    }

    loadQuotations() {
        this.spinner = true;
        this.quotationService.findAllByCustomerId(this.selectedCustomer.id).subscribe({
            next: (data: any) => {
                this.spinner = false;
                this.quotationList = data;
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.error.message
                })
            }
        })
    }

    loadSalesOrders() {
        this.spinner = true;
        this.salesOrderService.findAllByCustomerId(this.selectedCustomer.id).subscribe({
            next: (data: any) => {
                this.spinner = false;
                this.salesOrderList = data;
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.error.message
                })
            }
        })
    }

    loadNFs() {
        this.spinner = true;
        this.nFService.findAllByCustomerId(this.selectedCustomer.id).subscribe({
            next: (data: any) => {
                this.spinner = false;
                this.nFList = data;
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.error.message
                })
            }
        })
    }

    calculateQuotationTotal(items: { quantity: number, price: number }[]): number {
        return items.reduce((sum, item) => sum + item.price, 0);
    }

    selectQuotation(quotation: Quotation): void {
        this.quotation = quotation;
        this.selectedQuotation = true;
        this.quotationProducts = [...quotation.items];
        this.selectedProducts = [...this.products];
        this.products = this.products.filter(
            product => !quotation.items.some(item => item.productId === product.id)
        );
        this.selectedProducts = this.selectedProducts.filter(
            product => quotation.items.some(item => item.productId === product.id)
        );
    }

    async saveProposal() {
        this.spinner = true;

        if (this.isContactValid()) {
            try {
                await Promise.all([this.saveContactAsync(), this.saveSalesOrderAsync()]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Contato e orçamento salvos com sucesso!'
                });
                this.closeDialog(CustomerStatus.PROPOSAL);
                await this.refresh();
            } catch (error) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Erro ao salvar conato: '${error.error?.message || 'Erro desconhecido'}'`
                });
            } finally {
                this.spinner = false;
            }
        } else {
            this.spinner = false;
            this.messageService.add({
                severity: 'warn',
                summary: 'Ops...',
                detail: `Preencha os dados de contato!`
            })
        }
    }

    async saveSalesOrderAsync() {
        const salesOrder = new SalesOrder();
        salesOrder.quotationId = this.quotation.id;
        salesOrder.customerId = this.selectedCustomer.id;
        salesOrder.sellerId = Number.parseInt(localStorage.getItem("userId"));
        salesOrder.items = [...this.quotation.items];

        return new Promise<void>((resolve, reject) => {
            this.salesOrderService.create(salesOrder).subscribe({
                next: (response: any) => {
                    resolve();
                },
                error: (error: any) => {
                    reject(error);
                }
            });
        });
    }

    selectSalesOrder(salesOrder: SalesOrder) {
        this.salesOrder = salesOrder;
        this.selectedSalesOrder = true;
        this.salesOrderProducts = [...salesOrder.items];
        this.selectedProducts = [...this.products];
        this.products = this.products.filter(
            product => !salesOrder.items.some(item => item.productId === product.id)
        );
        this.selectedProducts = this.selectedProducts.filter(
            product => salesOrder.items.some(item => item.productId === product.id)
        );
        this.calculateDiscount(this.nf);
    }

    async saveNegotiation() {
        this.spinner = true;

        if (this.isContactValid()) {
            try {
                await Promise.all([this.saveContactAsync(), this.saveNFAsync()]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Contato e negociação salvos com sucesso!'
                });
                this.closeDialog(CustomerStatus.NEGOTIATION);
                await this.refresh();
            } catch (error) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Erro ao salvar conato: '${error.error?.message || 'Erro desconhecido'}'`
                });
            } finally {
                this.spinner = false;
            }
        } else {
            this.spinner = false;
            this.messageService.add({
                severity: 'warn',
                summary: 'Ops...',
                detail: `Preencha os dados de contato!`
            })
        }
    }

    async saveNFAsync() {
        this.spinner = true;
        this.nf.dueDate = new Date();
        this.nf.issueDate = new Date();
        this.nf.customerId = this.selectedCustomer.id;
        this.nf.sellerId = this.salesOrder.sellerId;
        this.nf.salesOrderId = this.salesOrder.id;
        this.nf.items = [...this.salesOrder.items];
        this.nf.totalValue = this.calculateDiscount(this.nf);
        this.nf.status = NFStatus.PENDING;

        return new Promise<void>((resolve, reject) => {
            this.nFService.create(this.nf).subscribe({
                next: (response: any) => {
                    resolve();
                },
                error: (error: any) => {
                    reject(error);
                }
            });
        });
    }

    calculateDiscount(nf: NF) {
        nf.totalValue = this.calculateQuotationTotal(this.salesOrder.items);

        if (nf.discountType === DiscountType.PERCENTAGE) {
            nf.totalValue -= (nf.totalValue * (nf.discount / 100));
        } else if (nf.discountType === DiscountType.FIXED) {
            nf.totalValue -= nf.discount;
        }

        nf.totalValue = parseFloat(nf.totalValue.toFixed(2));

        return nf.totalValue;
    }

    confirmRemoveFromWallet() {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja remover o cliente do funil?',
            header: 'Confirmação',
            rejectLabel: 'Não', rejectButtonStyleClass: 'p-button-danger',
            acceptLabel: 'Sim', acceptButtonStyleClass: 'p-button-secondary',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.removeFromWallet();
            },
            reject: () => {
            }
        });
    }

    removeFromWallet() {
        this.spinner = true;
        this.customerService.removeFromWallet(this.selectedCustomer.id).subscribe({
            next: (response: any) => {
                this.spinner = false;
                this.refresh();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Contato removido do funil com sucesso!'
                });
            },
            error: (error: any) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Erro ao remover do funil: '${error.error?.message || 'Erro desconhecido'}'`
                });
            }
        })
    }

    protected readonly CustomerStatus = CustomerStatus;
    protected readonly NFService = NFService;
    protected readonly NFStatus = NFStatus;
    protected readonly DiscountType = DiscountType;
}

