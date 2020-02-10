import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../common/user';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {Router} from '@angular/router';


@Component({
  selector: 'app-board-admin',
  templateUrl: './mat-table.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
    content = '';
    dataSource;
    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'email', 'roles', 'countries', 'details'];

  constructor(private userService: UserService, private router: Router) { }

  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
       this.initUsers();
  }

  initUsers(){
      this.userService.getUsers().subscribe(
          data => {
              this.dataSource = new MatTableDataSource<User>(data);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
          },
          error => {
              this.content = JSON.parse(error.error).message;
          }
      );
  }

    showUserDetails(user: User){
        this.router.navigate([`/profile`], {state: {data: user}});
    }
}
