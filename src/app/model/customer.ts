import {CustomerStatus} from "./customer-status";
import {Address} from "./address";

export class Customer {
    id: number;
    cpfCnpj: string;
    name: string;
    tradeName: string;
    email: string;
    birthFoundationDate: Date;
    stateRegistration: string;
    customerStatus: CustomerStatus;
    phoneNumbers: string[] = [];
    address: Address;
    createdDate: Date;
    lastModifiedDate: Date;
}
