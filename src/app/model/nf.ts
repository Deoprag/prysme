import {Customer} from "./customer";
import {User} from "./user";
import {SalesOrder} from "./sales-order";
import {ItemProduct} from "./item-product";
import {NFStatus} from "./nfstatus";
import {DiscountType} from "./discount-type";

export class NF {
    id: number;
    nfKey: string;
    issueDate: Date;
    dueDate: Date;
    customer: Customer;
    seller: User;
    salesOrder: SalesOrder;
    items: ItemProduct[] = [];
    totalValue: number;
    discount: number;
    discountType: DiscountType;
    status: NFStatus;
    observations: string;
    createdDate: Date;
    lastModifiedDate: Date;
    createdBy!: string;
    lastModifiedBy!: string;
}
