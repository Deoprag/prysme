import {Contact} from "./contact";
import {ContactType} from "./contact-type";

export class ContactInfo {
    id: number;
    contactType: ContactType;
    value: string;
    contactName: Contact;
    contactId: number;
}
