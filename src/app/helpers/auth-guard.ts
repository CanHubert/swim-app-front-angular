import {ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {TokenStorageService} from "../services/token-storage.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private tokenStorageService : TokenStorageService, private route:Route) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.tokenStorageService.getUser() == null)
    {
      this.route.redirectTo="/login";
      return false;
    }
    return true;
  }

}
