import {Component, OnInit} from '@angular/core';
import {User} from '../common/user';
import {TokenStorageService} from '../services/token-storage.service';
import {UserService} from '../services/user.service';
import {Role} from '../common/role';
import {RoleService} from '../services/role.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    user: User;
    isLoaded = false;
    isEdit = false;
    role: string;
    roles: Role[] = [];

    constructor(private tokenStorageService: TokenStorageService,
                private  userService: UserService,
                private roleService: RoleService) {
        if (tokenStorageService.getUser() == null) {
            window.location.href = '/login';
        }
    }

    ngOnInit() {

        if (history.state.data === undefined) {
            this.getUserDetails();
        } else {
            this.user = new User(history.state.data);
            this.findPromotionRole();
            this.isLoaded = true;
            this.isEdit = true;
            this.roleService.getRoles().subscribe(data =>
                this.roles = data);
        }
    }

    getUserDetails() {
        this.userService.getUserDetails(this.tokenStorageService.getUser().id).subscribe(data => {
            this.user = data,
                this.isLoaded = true;
        });

        if (this.user instanceof User) {
            this.tokenStorageService.saveUser(this.user);
        } else {
            console.log('user is undefined');
        }
    }

    findPromotionRole() {
        if (this.user.roles.includes('instructor')) {
            this.role = 'manager';
        } else {
            this.role = 'instructor';
        }

    }

    promote() {
        console.log(this.roles.map(r => r.name).includes('ROLE_ADMIN'))
    }
}
