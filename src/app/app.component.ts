import { Component , OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.swim.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log("on init in app component " + this.isLoggedIn);
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(`roles = ${this.roles}`);
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_INSTRUCTOR');

      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
