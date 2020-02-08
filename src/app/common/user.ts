export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    accessToken: string;
    roles: string[];

    constructor(user: any) {
        if(user)
        {
            this.id = user.id;
            this.username = user.username;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.email = user.email;
            this.roles = user.roles;
        }
    }
}
