import {Product} from "./product";
import {Quotation} from "./quotation";
import {SalesOrder} from "./sales-order";
import {NF} from "./nf";

export class ItemProduct {
    id: number;
    product: Product;
    quantity: number;
    quotation: Quotation;
    salesOrder: SalesOrder;
    nf: NF;
    price: number;
}
