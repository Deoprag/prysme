import {Component, OnInit} from '@angular/core';
import {forkJoin} from "rxjs";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {ChipsModule} from "primeng/chips";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputMaskModule} from "primeng/inputmask";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MessagesModule} from "primeng/messages";
import {PhoneFormatPipe} from "../../config/pipes/phone.format.pipe";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {SpinnerComponent} from "../../config/components/spinner/spinner.component";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {TooltipModule} from "primeng/tooltip";
import {Product} from "../../model/product";
import {ProductService} from "../../service/product.service";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {ProductCategory} from "../../model/product-category";
import {ProductCategoryService} from "../../service/product-category.service";
import {RadioButtonModule} from "primeng/radiobutton";
import {SelectButtonModule} from "primeng/selectbutton";

@Component({
    selector: 'product',
    standalone: true,
    imports: [
        ButtonModule,
        CalendarModule,
        ChipsModule,
        ConfirmDialogModule,
        DatePipe,
        DialogModule,
        FormsModule,
        InputGroupAddonModule,
        InputGroupModule,
        InputMaskModule,
        InputTextModule,
        MessagesModule,
        NgIf,
        PhoneFormatPipe,
        SharedModule,
        SpinnerComponent,
        TableModule,
        TagModule,
        ToastModule,
        TooltipModule,
        NgClass,
        InputTextareaModule,
        InputNumberModule,
        DropdownModule,
        RadioButtonModule,
        SelectButtonModule
    ],
    providers: [ConfirmationService, MessageService],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
    productDialog: boolean = false;
    spinner: boolean = false;

    products: Product[];
    product: Product = new Product();
    productCategories: ProductCategory[];
    selectedProductCategory: ProductCategory = new ProductCategory();

    constructor(
        private productService: ProductService,
        private productCategoryService: ProductCategoryService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.product = new Product();
        this.selectedProductCategory = new ProductCategory()
        this.spinner = true;

        forkJoin({
            productCategories: this.productCategoryService.findAll(),
            products: this.productService.findAll()
        }).subscribe({
            next: (results) => {
                this.spinner = false;
                this.productCategories = results.productCategories;
                this.products = results.products;
            },
            error: (error) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Erro ao carregar dados: '${error.error.message}'`
                });
            }
        });
    }

    editProduct(product: Product) {
        this.product = {...product};
        this.productDialog = true;
    }

    confirmDeleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja deletar o produto?',
            header: 'Confirmação',
            acceptLabel: 'Sim', acceptButtonStyleClass: 'p-button-secondary',
            rejectLabel: 'Não', rejectButtonStyleClass: 'p-button-danger',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteProduct(product);
            }
        });
    }

    deleteProduct(product: Product) {
        this.spinner = true;
        this.productService.delete(product.id).subscribe({
            next: () => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Produto deletado com sucesso.'
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

    saveProduct() {
        this.product.id > 0 ? this.updateProduct() : this.createProduct();
    }

    createProduct() {
        this.spinner = true;
        this.productService.create(this.product).subscribe({
            next: () => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Produto criado com sucesso.'
                });
                this.productDialog = false;
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

    updateProduct() {
        this.productService.update(this.product).subscribe({
            next: () => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Produto atualizado com sucesso.'
                });
                this.productDialog = false;
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
}
