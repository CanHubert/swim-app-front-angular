import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export const baseUrl = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
class BaseService {

  constructor(protected baseUrl:string, protected http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/';
  }


  public createJsonGet(endpoint: string): Observable<any> {
    return this.http.get(this.baseUrl + endpoint, {responseType: 'json'});
  }
}
