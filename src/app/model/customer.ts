import {CustomerStatus} from "./customer-status";
import {Address} from "./address";

export class Customer {
    id: number = 0;
    cpfCnpj: string;
    name: string;
    tradeName: string;
    email: string;
    birthFoundationDate: Date;
    stateRegistration: string;
    customerStatus: CustomerStatus = CustomerStatus.NEW;
    phoneNumbers: string[] = [];
    address: Address = new Address();
    seller: string;
    sellerId: number;
    createdDate: Date;
    lastModifiedDate: Date;
    createdBy!: string;
    lastModifiedBy!: string;
}
