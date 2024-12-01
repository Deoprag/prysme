import {ItemProduct} from "./item-product";
import { OrderStatus } from "./order-status";

export class SalesOrder {
    id: number;
    quotationId: number;
    customer: string;
    customerId: number;
    seller: string;
    sellerId: number;
    dateTime: Date;
    notes: string;
    status: OrderStatus;
    items: ItemProduct[] = [];
    createdDate: Date;
    lastModifiedDate: Date;
    createdBy!: string;
    lastModifiedBy!: string;
}
