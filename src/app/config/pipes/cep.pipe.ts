import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'cep'
})
export class CepPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return value;

        value = value.replace(/\D/g, '');

        if (value.length <= 5) {
            return value;
        }

        return `${value.slice(0, 5)}-${value.slice(5, 8)}`;
    }
}
