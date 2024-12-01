import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DatePipe, NgClass} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {RadioButtonModule} from "primeng/radiobutton";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {SpinnerComponent} from "../../../config/components/spinner/spinner.component";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {ProductCategory} from "../../../model/product-category";
import {ProductCategoryService} from "../../../service/product-category.service";
import {UtilsService} from "../../../service/utils.service";

@Component({
    selector: 'product-category',
    standalone: true,
    imports: [
        ButtonModule,
        ConfirmDialogModule,
        DatePipe,
        DialogModule,
        DropdownModule,
        FormsModule,
        InputNumberModule,
        InputTextModule,
        InputTextareaModule,
        PaginatorModule,
        RadioButtonModule,
        SharedModule,
        SpinnerComponent,
        TableModule,
        TagModule,
        ToastModule,
        NgClass
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './product-category.component.html',
    styleUrl: './product-category.component.scss'
})
export class ProductCategoryComponent implements OnInit {
    productCategoryDialog: boolean = false;
    spinner: boolean = false;

    productCategories: ProductCategory[];
    productCategory: ProductCategory = new ProductCategory();

    constructor(
        private productCategoryService: ProductCategoryService,
        private confirmationService: ConfirmationService,
        private utilsService: UtilsService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    exportCSV() {
        this.utilsService.exportToCSV(this.productCategories, 'Categorias de Produto')
    }

    refresh() {
        this.spinner = true;

        this.productCategoryService.findAll().subscribe({
            next: (result: any) => {
                this.spinner = false;
                this.productCategories = result;
            },
            error: (error) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Erro ao carregar categorias de produto: '${error.error.message}'`
                });
            }
        });
    }

    editProductCategory(productCategory: ProductCategory) {
        this.productCategory = productCategory;
        this.productCategoryDialog = true;
    }

    confirmDeleteProductCategory(productCategory: ProductCategory) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja deletar o produto?',
            header: 'Confirmação',
            acceptLabel: 'Sim', acceptButtonStyleClass: 'p-button-secondary',
            rejectLabel: 'Não', rejectButtonStyleClass: 'p-button-danger',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteProduct(productCategory);
            },
            reject: () => {
            }
        });
    }

    deleteProduct(productCategory: ProductCategory) {
        this.spinner = true;
        this.productCategoryService.delete(productCategory.id).subscribe({
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

    saveProductCategory() {
        this.productCategory.id > 0 ? this.updateProductCategory() : this.createProductCategory();
    }

    createProductCategory() {
        this.spinner = true;
        this.productCategoryService.create(this.productCategory).subscribe({
            next: () => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Categoria de produto criada com sucesso.'
                });
                this.productCategoryDialog = false;
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

    updateProductCategory() {
        this.spinner = true;
        this.productCategoryService.update(this.productCategory).subscribe({
            next: () => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Categoria de produto atualizada com sucesso.'
                });
                this.productCategoryDialog = false;
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
