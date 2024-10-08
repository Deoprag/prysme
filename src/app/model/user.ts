import {Team} from "./team";
import {Task} from "./task";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    birthDate: Date;
    gender: string;
    phoneNumber: string;
    password: string;
    active: boolean;
    team: Team;
    tasks: Task[];
    createdDate: Date;
    lastModifiedDate: Date;
}
