export class Task {
    id: number;
    title: string;
    description: string;
    completedDateTime: Date;
    createdDate: Date;
    lastModifiedDate: Date;
    createdBy!: string;
    lastModifiedBy!: string;
}
