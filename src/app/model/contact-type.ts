export enum ContactType {
    IN_PERSON = 'IN_PERSON',
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    WHATSAPP = 'WHATSAPP',
}

export namespace ContactType {
    export function getOptions() {
        return [
            { label: 'Presencialmente', value: 'IN_PERSON' },
            { label: 'Email', value: 'EMAIL' },
            { label: 'Telefone', value: 'PHONE' },
            { label: 'WhatsApp', value: 'WHATSAPP' }
        ];
    }
}
