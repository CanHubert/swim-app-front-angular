import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    constructor(private authService: AuthService,
                private tokenStorage: TokenStorageService) {
    }

    ngOnInit() {
        console.log('oninit');
        if (this.tokenStorage.getUser()) {
            this.isLoggedIn = true;
            console.log('setLoggedIn= true');
            console.log(this.tokenStorage.getUser());
            this.roles = this.tokenStorage.getUser().roles.map(role => role.name);
        }
        console.log(`loggedId = ${this.isLoggedIn}`);
    }

    onSubmit() {
        this.authService.login(this.form).subscribe(
            data => {
                console.log('inside onSubmit');
                console.log(data);
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.tokenStorage.getUser().roles.map(role => role.name);
                this.reloadPage();
            },
            error => {
                console.log('inside onSubmit');
                console.log(error);
                this.errorMessage = error.error.message;
                this.isLoginFailed = true;
            }
        );
    }

    private reloadPage() {
        window.location.reload();
    }
}
