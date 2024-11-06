import {Team} from "./team";

export class TeamGoal {
    id: number;
    goal: number;
    team: Team;
    startDate: Date;
    endDate: Date;
    createdDate: Date;
    lastModifiedDate: Date;
    createdBy!: string;
    lastModifiedBy!: string;
}
