export class Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date = new Date();
    userId: number;
    createdDate: Date;
    lastModifiedDate: Date;
    createdBy!: string;
    lastModifiedBy!: string;
}
