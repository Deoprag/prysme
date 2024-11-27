import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'cpfCnpj'
})
export class CpfCnpjPipe implements PipeTransform {
    transform(value: string | number): string {
        if (!value) {
            return '';
        }

        const stringValue = value.toString().replace(/\D/g, '');

        if (stringValue.length === 11) {
            return stringValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (stringValue.length === 14) {
            return stringValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }

        return value.toString();
    }
}
