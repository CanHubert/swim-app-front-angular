import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../common/user';
import {baseUrl} from './base.service';

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

  private createJsonGet(endpoint: string): Observable<any> {
    return this.http.get(baseUrl + endpoint, {responseType: 'json'});
  }
}
