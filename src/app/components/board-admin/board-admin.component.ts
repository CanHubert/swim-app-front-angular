import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../common/user';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
    content = '';
    users: User[];
    dataSource: MatTableDataSource<User>;
    displayedColumns: string[] = ['position', 'weight', 'symbol', 'name'];

  constructor(private userService: UserService) { }

  @ViewChild(MatPaginator , {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngOnInit() {

        this.userService.getUsers().subscribe(
            data => {
              this.users = data;
            },
            error => {
              this.content = JSON.parse(error.error).message;
            }
        );
        this.dataSource = new MatTableDataSource(this.users);
        console.log(this.dataSource);
        console.log('users ' + this.users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

  }
}


