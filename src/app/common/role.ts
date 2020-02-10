export class Role {
    id : number;
    name : string;


    constructor(role: any) {
        if(role)
        {
            this.id = role.id;
            this.name = role.name;
        }
    }

}
