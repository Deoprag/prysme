export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELED = 'CANCELED',
    FINALIZED = 'FINALIZED'
}

export namespace OrderStatus {
    export function getOptions() {
        return [
            { label: 'Pendente', value: 'PENDING' },
            { label: 'Aprovado', value: 'CONFIRMED' },
            { label: 'Desaprovado', value: 'CANCELED' },
            { label: 'Finalizado', value: 'FINALIZED' }
        ];
    }
}
