import {Customer} from "./customer";
import {User} from "./user";
import {ItemProduct} from "./item-product";
import {QuotationStatus} from "./quotation-status";

export class Quotation {
    id!: number;
    customerId!: number;
    customer!: string;
    sellerId!: number;
    seller: string;
    dateTime!: Date;
    quotationStatus: QuotationStatus = QuotationStatus.OPEN;
    items: ItemProduct[] = [];
    createdDate!: Date;
    lastModifiedDate!: Date;
    createdBy!: string;
    lastModifiedBy!: string;
}
