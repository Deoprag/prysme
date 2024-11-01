import {ContactType} from "./contact-type";

export class ContactInfo {
    id: number;
    contactType: ContactType = ContactType.PHONE;
    value: string;
    contactName: string;
    contactId: number;
}
