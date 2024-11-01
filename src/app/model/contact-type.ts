export enum ContactType {
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    WHATSAPP = 'WHATSAPP',
}

export namespace CustomerStatus {
    export function getOptions() {
        return [
            { label: 'Email', value: 'EMAIL' },
            { label: 'Telefone', value: 'PHONE' },
            { label: 'WhatsApp', value: 'WHATSAPP' }
        ];
    }
}
