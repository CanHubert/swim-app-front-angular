import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../common/country';
import {baseUrl} from './base.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.http.get<getCountries>(baseUrl+'api/countries', {responseType : "json"})
        .pipe(map(response => response._embedded.countries));
  }
}

interface getCountries{
  _embedded: {
    countries : Country[];
  }
}
