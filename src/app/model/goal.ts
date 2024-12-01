export class Goal {
    id: number;
    goal: number;
    currentProgress: number;
    seller: string;
    sellerId: number;
    startDate: Date;
    endDate: Date;
    createdDate: Date;
    lastModifiedDate: Date;
    createdBy!: string;
    lastModifiedBy!: string;
}
