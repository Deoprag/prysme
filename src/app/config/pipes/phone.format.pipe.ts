import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return value;

        const cleaned = ('' + value).replace(/\D/g, '');

        const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }

        return value;
    }
}
