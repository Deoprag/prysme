import {ContactInfo} from "./contact-info";
import {Customer} from "./customer";
import {CustomerStatus} from "./customer-status";

export class Contact {
    id!: number;
    sellerId: number;
    seller: string;
    customerId: number;
    customer: string;
    info: ContactInfo = new ContactInfo();
    customerStatus!: CustomerStatus;
    notes!: string;
    contactDate!: Date;
    createdDate!: Date;
    lastModifiedDate!: Date;
    createdBy!: string;
    lastModifiedBy!: string;
}
