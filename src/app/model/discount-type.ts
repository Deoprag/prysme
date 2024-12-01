export enum DiscountType {
    PERCENTAGE = 'PERCENTAGE',
    FIXED = 'FIXED'
}

export namespace DiscountType {
    export function getOptions() {
        return [
            { label: 'Porcentagem', value: 'PERCENTAGE' },
            { label: 'Fixo', value: 'FIXED' },
        ];
    }
}
