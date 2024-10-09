export class Team {
    id: number;
    name: string;
    managerId: number;
    manager: string;
    sellersIds: number[] = [];
    sellers: string[] = [];
}
