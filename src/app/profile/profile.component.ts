import { Component, OnInit } from '@angular/core';
import {User} from "../common/user";
import {TokenStorageService} from "../services/token-storage.service";
import {UserService} from "../services/user.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Route} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User;
  constructor(private tokenStorageService: TokenStorageService,
              private  userService : UserService) {
    if(tokenStorageService.getUser() == null)
    {
      window.location.href="/login"
    }
  }

  ngOnInit() {
    this.getUserDetails()
  }

  getUserDetails(){
    this.userService.getUserDetails(this.tokenStorageService.getUser().id).subscribe(data => this.user = data);
    console.log("getUserDetails");
    console.log(this.user);
    if(this.user instanceof User)
    {
      this.tokenStorageService.saveUser(this.user);
    }
    else
    {
      console.log("user is undefined");
    }
  }
}
