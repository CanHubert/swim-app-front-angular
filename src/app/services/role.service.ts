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
        const url = baseUrl + 'api/roles';
        console.log((url));
        return this.http.get<Roles>(url).pipe(map(res => res._embedded.roles));
    }
}

interface Roles {
    _embedded: {
        roles: Role[];
    }
}
