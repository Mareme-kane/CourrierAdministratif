import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/authentication/signin']);
      return false;
    }

    if (this.authService.isTokenExpired()) {
      return this.authService.refreshToken().pipe(
        map(response => {
          if (response.status === 'success') {
            return this.handleRouteRedirection(state.url);
          } else {
            this.authService.logout();
            this.router.navigate(['/authentication/signin']);
            return false;
          }
        }),
        catchError(() => {
          this.authService.logout();
          this.router.navigate(['/authentication/signin']);
          return of(false);
        })
      );
    }

    return this.handleRouteRedirection(state.url);
  }

  private handleRouteRedirection(url: string): boolean {
    if (url === '/' || url === '' || url === '/main') {
      const currentRole = this.authService.getCurrentUserRole();
      switch (currentRole) {
        case 'AGENT_BUREAU_COURRIER':
          this.router.navigate(['/pages/agent-bureau']);
          return false;
        case 'DIRECTEUR':
          this.router.navigate(['/pages/directeur']);
          return false;
        case 'SECRETAIRE':
          this.router.navigate(['/pages/secretaire']);
          return false;
        case 'CHEF_SERVICE':
          this.router.navigate(['/pages/chef-service']);
          return false;
        case 'ADMIN':
          this.router.navigate(['/pages/admin']);
          return false;
        default:
          this.router.navigate(['/authentication/signin']);
          return false;
      }
    }
    return true;
  }
}
