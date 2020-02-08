import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {User} from '../common/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  getPublicContent(): Observable<any> {
    return this.createTextGet('test/all');
  }

  getUserBoard(): Observable<any> {
    return this.createTextGet('test/user');
  }

  getModeratorBoard(): Observable<any> {
    return this.createTextGet('test/mod');
  }

  getUsers(): Observable<any> {
    const url  = 'api/users/roles';
    return this.createJsonGet(url);
  }

  getUserDetails(id: number): Observable<User> {
    return this.createJsonGet(`api/users/${id}`);
  }

  private createTextGet(endpoint: string): Observable<any> {
    return this.http.get(this.baseUrl + endpoint, {responseType: 'text'});
  }

  private createJsonGet(endpoint: string): Observable<any> {

    return this.http.get(this.baseUrl + endpoint, {responseType: 'json'});
  }
}
