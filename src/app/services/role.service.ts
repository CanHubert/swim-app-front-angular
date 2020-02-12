import {Injectable} from '@angular/core';
import {baseUrl} from './base.service';
import {Observable} from 'rxjs';
import {Role} from '../common/role';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private http: HttpClient) {
    }

    getRoles(): Observable<Role[]> {
        return this.http.get<Roles>('http://localhost:8080/api/roles?sort=order').pipe(map(res => res._embedded.roles));
    }
}

interface Roles {
    _embedded: {
        roles: Role[];
    }
}
