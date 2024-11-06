import {Quotation} from "./quotation";
import {Customer} from "./customer";
import {User} from "./user";
import {ItemProduct} from "./item-product";
import { OrderStatus } from "./order-status";

export class SalesOrder {
    id: number;
    quotation: Quotation;
    customer: Customer;
    seller: User;
    dateTime: Date;
    status: OrderStatus;
    items: ItemProduct[] = [];
    createdDate: Date;
    lastModifiedDate: Date;
    createdBy!: string;
    lastModifiedBy!: string;
}
