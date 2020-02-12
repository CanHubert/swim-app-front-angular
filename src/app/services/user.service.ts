import {Injectable} from '@angular/core';
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
        return this.createJsonGet('api/users/details');
    }

    getUserDetails(id: number): Observable<User> {
        return this.createJsonGet(`api/users/${id}`);
    }

    updateUser(user: User): Observable<void> {
        return this.http.put<void>(baseUrl + `api/users`, user, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
    }

    private createJsonGet(endpoint: string): Observable<any> {
        return this.http.get(baseUrl + endpoint, {responseType: 'json'});
    }
}
