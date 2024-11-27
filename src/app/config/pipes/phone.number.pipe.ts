import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return value;

        value = value.replace(/\D/g, '');

        if (value.length <= 10) {
            return value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
        } else if (value.length === 11) {
            return value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        }
        return value;
    }

}
