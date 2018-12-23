import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canLoad(): boolean {
    return this.isActivated();
  }

  canActivate(): boolean {
    return this.isActivated();
  }

  isActivated(): boolean {
    if (this.authService.loggedIn()) {
      this.router.navigate([this.authService.defaultRoute()]);
      return true;
    }
    return true;
  }
}
