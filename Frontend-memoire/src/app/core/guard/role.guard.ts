import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/authentication/signin']);
      return false;
    }
    const requiredRole = route.data['role'] as string;
    
    console.log('RoleGuard - Required role:', requiredRole);
    console.log('RoleGuard - Is authenticated:', this.authService.isAuthenticated);
    console.log('RoleGuard - Current user role:', this.authService.getCurrentUserRole());
    console.log('RoleGuard - Has required role:', this.authService.hasRole(requiredRole));

    if (this.authService.isAuthenticated && this.authService.hasRole(requiredRole)) {
      console.log('RoleGuard - Access granted');
      return true;
    }

    if (this.authService.isAuthenticated) {
      const userRole = this.authService.getCurrentUserRole();
      switch (userRole) {
        case 'ADMIN':
          this.router.navigate(['/pages/admin']);
          break;
        case 'DIRECTEUR':
          this.router.navigate(['/pages/directeur']);
          break;
        case 'SECRETAIRE':
          this.router.navigate(['/pages/secretaire']);
          break;
        case 'AGENT_BUREAU_COURRIER':
          this.router.navigate(['/pages/agent-bureau']);
          break;
        case 'CHEF_SERVICE':
          this.router.navigate(['/pages/chef-service']);
          break;
        default:
          this.router.navigate(['/authentication/signin']);
      }
    } else {
      this.router.navigate(['/authentication/signin']);
    }

    return false;
  }
}
