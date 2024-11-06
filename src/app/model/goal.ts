import {User} from "./user";

export class Goal {
    id: number;
    goal: number;
    seller: User;
    startDate: Date;
    endDate: Date;
    createdDate: Date;
    lastModifiedDate: Date;
    createdBy!: string;
    lastModifiedBy!: string;
}
