import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getPublicContent(): Observable<any>{
    return this.createGet('all');
  }

  getUserBoard(): Observable<any>{
    return this.createGet('user');
  }

  getModeratorBoard():Observable<any>{
    return this.createGet('mod');
  }

  getAdminBoard() :Observable<any>{
    return this.createGet('admin');
  }

  private createGet(endpoint:string): Observable<any>{
    return this.http.get(API_URL + endpoint, {responseType: "text"});
  }
}
