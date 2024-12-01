import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
    fileName: string;

    exportToCSV<T>(data: T[], filename: string = this.fileName): void {
        if (!data || data.length === 0) {
            console.error('No data available for export');
            return;
        }

        const headers = Object.keys(data[0]);
        const rows = data.map(item =>
            headers.map(header => this.formatCSVField(item[header])).join(',')
        );

        const csvContent = [headers.join(','), ...rows].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    private formatCSVField(field: any): string {
        if (Array.isArray(field)) {
            return '-';
        }
        if (typeof field === 'object' && field !== null) {
            return '-';
        }
        if (typeof field === 'string' && field.includes(',')) {
            return `"${field.replace(/"/g, '""')}"`;
        }
        return field != null ? field.toString() : '';
    }
}

