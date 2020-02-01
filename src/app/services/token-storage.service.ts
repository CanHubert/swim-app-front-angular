import { Injectable } from '@angular/core';
import {User} from "../common/user";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(){
    window.sessionStorage.clear();
  }

  public saveToken(token:string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }
  public getToken(){
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user){
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,user);
  }

  public getUser(){
    console.log("getUser " +window.sessionStorage.getItem(USER_KEY));
    return JSON.parse(window.sessionStorage.getItem(USER_KEY));
  }

}
