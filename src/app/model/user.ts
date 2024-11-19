import {Team} from "./team";
import {Task} from "./task";

export class User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    birthDate: Date;
    gender: string;
    phoneNumber: string;
    password: string;
    enabled: boolean = true;
    teamId: number;
    team!: string;
    tasks: Task[];
    permissions!: string[];
    createdDate: Date;
    lastModifiedDate: Date;
    createdBy!: string;
    lastModifiedBy!: string;
}
