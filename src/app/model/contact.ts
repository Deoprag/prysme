import {ContactInfo} from "./contact-info";
import {User} from "./user";
import {Customer} from "./customer";
import {CustomerStatus} from "./customer-status";

export class Contact {
    id!: number;
    seller!: User;
    customer!: Customer;
    info: ContactInfo = new ContactInfo();
    customerStatus!: CustomerStatus;
    notes!: string;
    contactDate!: Date;
    createdDate!: Date;
    lastModifiedDate!: Date;
    createdBy!: string;
    lastModifiedBy!: string;
}
