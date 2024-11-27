import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'ie'
})
export class IePipe implements PipeTransform {
    transform(value: string | number): string {
        if (!value) return '';
        const ie = value.toString().replace(/\D/g, '');

        if (ie.length <= 9) {
            return ie.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
        } else if (ie.length === 12) {
            return ie.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4');
        } else {
            return ie;
        }
    }
}
