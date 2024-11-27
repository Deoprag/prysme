import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform(array: any[], field: string): any[] {
        if (!array || array.length === 0) return [];
        const direction = field.startsWith('-') ? -1 : 1;
        const fieldName = field.replace('-', '');
        return array.sort((a, b) => {
            const aValue = a[fieldName];
            const bValue = b[fieldName];
            return (aValue > bValue ? 1 : -1) * direction;
        });
    }
}
