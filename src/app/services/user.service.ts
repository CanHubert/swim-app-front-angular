import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../common/user';
import {baseUrl} from './base.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any> {
    const url  = 'api/users/details';
    return this.createJsonGet(url);
  }

  getUserDetails(id: number): Observable<User> {
    return this.createJsonGet(`api/users/${id}`);
  }

  addUserRole(user: User): Observable<void>{
    let url = baseUrl + `api/users`;
    console.log(url);
    return this.http.put<void>(url, user, {headers : new HttpHeaders({'Content-Type': 'application/json'})});
  }

  private createJsonGet(endpoint: string): Observable<any> {
    return this.http.get(baseUrl + endpoint, {responseType: 'json'});
  }
}
