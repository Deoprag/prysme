import {Customer} from "./customer";
import {User} from "./user";
import {ItemProduct} from "./item-product";
import {QuotationStatus} from "./quotation-status";

export class Quotation {
    id: number;
    customer: Customer;
    seller: User;
    dateTime: Date;
    quotationStatus: QuotationStatus;
    items: ItemProduct[] = [];
    createdDate: Date;
    lastModifiedDate: Date;
}
