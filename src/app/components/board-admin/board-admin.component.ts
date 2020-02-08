import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../common/user";


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
content = '';
users: User[];
  constructor(private userService :UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
        data=>{
          this.users = data;
        },
        error => {
          this.content = JSON.parse(error.error).message;
        }
    )
  }
}


