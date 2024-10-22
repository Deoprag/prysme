export enum CustomerStatus {
    NEW = 'NEW',
    CONTACT = 'CONTACT',
    PRESENTATION = 'PRESENTATION',
    PROPOSAL = 'PROPOSAL',
    NEGOTIATION = 'NEGOTIATION',
    CLOSURE = 'CLOSURE',
    FINALIZED = 'FINALIZED',
    LOST = 'LOST',
    DELETED = 'DELETED',
}

export namespace CustomerStatus {
    export function getOptions() {
        return [
            { label: 'Novo', value: CustomerStatus.NEW },
            { label: 'Contato', value: CustomerStatus.CONTACT },
            { label: 'Apresentação', value: CustomerStatus.PRESENTATION },
            { label: 'Proposta', value: CustomerStatus.PROPOSAL },
            { label: 'Negociação', value: CustomerStatus.NEGOTIATION },
            { label: 'Fechamento', value: CustomerStatus.CLOSURE },
            { label: 'Finalizado', value: CustomerStatus.FINALIZED },
            { label: 'Perdido', value: CustomerStatus.LOST },
        ];
    }
}
