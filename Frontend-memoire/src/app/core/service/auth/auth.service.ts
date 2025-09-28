import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {SnackbarService} from "../common/snackbar.service";
import { User, ApiResponse, LoginRequest, LoginResponse, Role } from '../../models/user';
import { environment } from 'src/environments/environment';
import { JwtService } from '../jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private tokenExpirationTimer: any = null;

  constructor(private http: HttpClient, private router: Router, private jwtService: JwtService, private snackbarService: SnackbarService,) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(loginRequest: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${environment.apiUrl}/auth/login`, loginRequest)
      .pipe(
        tap(response => {
          if (response.status === 'success' && response.data) {
            this.handleAuthentication(response.data);
          }
        }, error => {
          this.snackbarService.showNotification('snackbar-danger', 'Something went wrong!.', 'top', 'right');
        }))
  }

  private handleAuthentication(authData: LoginResponse): void {
    const user = authData.user;
    user.token = authData.access_token;

    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', authData.access_token);

    this.currentUserSubject.next(user);
    this.autoLogout(this.getTokenExpirationDate(authData.access_token));

    const decodedToken = this.jwtService.DecodeToken(authData.access_token);
    const userRole = decodedToken['roles'][0]; 
    console.log('User role from token:', userRole);
    // Redirection basée sur le rôle
    this.redirectBasedOnRole(userRole);
  }

  private redirectBasedOnRole(role: string): void {
    let targetRoute: string;

    switch (role) {
      case Role.ADMIN:
         targetRoute = '/pages/admin';
        break;
      case Role.AGENT_BUREAU_COURRIER:
         targetRoute = '/pages/agent-bureau';
        break;
      case Role.DIRECTEUR:
         targetRoute = '/pages/directeur';
        break;
      case Role.SECRETAIRE:
           targetRoute = '/pages/secretaire';
        break;
       case Role.CHEF_SERVICE:
           targetRoute = '/pages/chef-service';
        break;
      default:
        targetRoute = '/pages/agent-bureau';
    }

    setTimeout(() => {
      this.router.navigate([targetRoute]).then(() => {
        this.snackbarService.showNotification('snackbar-success', 'Login Successful!', 'top', 'right');
      });
    }, 100);
  }

  private getTokenExpirationDate(token: string): Date {
    try {
      const decodedToken = this.jwtService.DecodeToken(token);
      return new Date(decodedToken.exp * 1000);
    } catch (error) {
      return new Date(new Date().getTime() + 60 * 60 * 1000);
    }
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get isAuthenticated(): boolean {
    const token = this.token;
    if (!token) {
      this.router.navigate(['/authentication/signin']);
      return false;
    }
    return !!this.currentUserValue;
  }

  hasRole(role: string): boolean {
    if (!this.token) return false;
    try {
      const decodedToken = this.jwtService.DecodeToken(this.token);
      const userRoles = decodedToken['roles'] || [];
      return userRoles.includes(role);
    } catch (error) {
      return false;
    }
  }

  isAdmin(): boolean {
    return this.hasRole(Role.ADMIN);
  }

  isDirecteur(): boolean {
    return this.hasRole(Role.DIRECTEUR);
  }

  isSecretaire(): boolean {
    return this.hasRole(Role.SECRETAIRE);
  }

  isChefService(): boolean {
    return this.hasRole(Role.CHEF_SERVICE);
  }

  isAgentBureau(): boolean {
    return this.hasRole(Role.AGENT_BUREAU_COURRIER);
  }

  getCurrentUserRole(): string | null {
    if (!this.token) return null;
    try {
      const decodedToken = this.jwtService.DecodeToken(this.token);
      const userRoles = decodedToken['roles'] || [];
      return userRoles[0] || null;
    } catch (error) {
      return null;
    }
  }

  logout(): Observable<any> {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.snackbarService.showNotification('snackbar-success', 'Logged out successfully.', 'top', 'right');
    this.router.navigate(['/authentication/signin']);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
    return of(true);
  }

  private autoLogout(expirationDate: Date): void {
    const expiresIn = expirationDate.getTime() - new Date().getTime();
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expiresIn);
  }

  refreshToken(): Observable<ApiResponse<LoginResponse>> {
    const token = this.token;
    return this.http.post<ApiResponse<LoginResponse>>(`${environment.apiUrl}/auth/refresh`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap(response => {
        if (response.status === 'success' && response.data) {
          this.handleAuthentication(response.data);
        }
      })
    );
  }

  getProfile(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${environment.apiUrl}/auth/profile`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }

  isTokenExpired(): boolean {
    if (!this.token) return true;
    try {
      const decodedToken = this.jwtService.DecodeToken(this.token);
      const expirationDate = new Date(decodedToken.exp * 1000);
      return expirationDate <= new Date();
    } catch {
      return true;
    }
  }
}
