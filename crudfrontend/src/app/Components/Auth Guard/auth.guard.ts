import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";
import {AuthService} from "../Services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.UserdataSubject.pipe(
      take(1),
      map(Userdata => {
        const isAuth = !Userdata ? false : true;
        if(!isAuth){
          return this.router.createUrlTree(['/login']);
        }
        return isAuth;
      })
  )};
}
