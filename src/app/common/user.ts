import {Role} from './role';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    accessToken: string;
    roles: Role[];
    countries: string[];


    constructor(user: any) {
        if(user)
        {
            console.log(`inside user constructor ${user.id}`);
            this.id = user.id;
            this.username = user.username;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.email = user.email;
            this.roles = user.roles;
            this.countries = user.countries;
        }
    }

    toString(): string{
        return `id = ${this.id}, username= ${this.username}, firstname = ${this.firstName}`
    }
}
