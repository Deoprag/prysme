import {ItemProduct} from "./item-product";
import {NFStatus} from "./nfstatus";
import {DiscountType} from "./discount-type";

export class NF {
    id: number;
    nfKey: string;
    issueDate: Date;
    dueDate: Date;
    customerId: number;
    customer: string;
    sellerId: number;
    seller: string;
    salesOrderId: number;
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
