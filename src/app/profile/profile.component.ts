import {Component, OnInit} from '@angular/core';
import {User} from '../common/user';
import {Role} from '../common/role';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileFacadeService} from '../facade/profile-facade.service';
import {UserHelper} from '../helpers/UserHelper';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public UserHelper = UserHelper;
    countries = new FormControl();
    countriesList: string[];
    user: User;
    isLoaded = false;
    isEdit = false;
    advRole: Role;
    canDemote = true;
    canPromote = true;
    roles: Role[] = [];
    roleNames: string[];

    constructor(private facade : ProfileFacadeService,
                private route: ActivatedRoute,
                private router : Router) {
        if (facade.getUser() == null) {
            window.location.href = '/login';
        }
    }

    ngOnInit() {

        if (this.route.snapshot.paramMap.has('id')) {
            this.getUserDetails(Number(this.route.snapshot.paramMap.get('id')));
            this.facade.getCountries().subscribe(data=> this.countriesList = data.map(c=> c.name));
            this.isEdit = true;

        } else {
            this.getUserDetails(this.facade.getUser().id);
        }

    }

    getUserDetails(id: number) {
        this.facade.getUserDetails(id).subscribe(data => {
            this.user = data;
            this.roleNames = this.user.roles.map(role => role.name).reverse();
            this.isLoaded = true;
            this.findPromotionRole();
        });

        if (this.user instanceof User) {
            this.facade.saveUser(this.user);
        } else {
            console.log('user is undefined');
        }
    }

    findPromotionRole() {
        this.facade.getRoles().subscribe(data => {
            this.roles = data;

            let rolesNames: string[] = this.user.roles.map(role => role.name);
            console.log(' roleNames =' + rolesNames);
            if (rolesNames.includes('MANAGER')) {
                this.canPromote = false;
                this.advRole = undefined;
            } else if (rolesNames.includes('INSTRUCTOR')) {
                this.advRole = this.roles.filter(role => role.name === 'MANAGER')[0];
            } else {
                this.canDemote = false;

                this.advRole = this.roles.filter(role => role.name === 'INSTRUCTOR')[0];
            }


        },
            error => console.log(error));
    }

    promote() {
        this.user.roles.push(this.advRole);
        this.updateUserRole();
        this.activeDemoteButton();
       //  this.canPromote = false;
       // // setTimeout( this.activePromoteButton,  5000);
       //  this.canPromote = false;
       //  setTimeout(function() {
       //      (<HTMLInputElement>document.getElementById('promote_button')).disabled= false;
       //  }, 2000);

    }


    private activePromoteButton(){
        this.canPromote = true;
    }

    private activeDemoteButton(){
        this.canDemote = true;
    }



    demote() {
        this.user.roles.pop();
        this.updateUserRole();
        this.activePromoteButton();
        // this.canDemote = false;
        // this.activeDemoteButton();
    }

    private updateUserRole() {
        this.facade.addUserRole(this.user).subscribe(() => this.ngOnInit(), error => {
            console.log(error);
        });
    }

    goToAdmin() {
        this.router.navigateByUrl("/admin");
    }
}
