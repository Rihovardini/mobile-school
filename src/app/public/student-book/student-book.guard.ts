import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router,  Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StudentBookGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canLoad() {
    return this.isAllowed();
  }

  canActivate() {
    return this.isAllowed();
  }

  isAllowed(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
