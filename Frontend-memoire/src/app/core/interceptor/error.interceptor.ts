import { AuthService } from '../service/auth/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
     return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue';

        // Gestion des erreurs selon le code HTTP
        switch (error.status) {
          case 400:
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            } else {
              errorMessage = 'Requête invalide';
            }
            break;
          case 401:
            errorMessage = 'Session expirée, veuillez vous reconnecter';
            this.authService.logout();
            this.router.navigate(['/authentication/signin']);
            break;
          case 403:
            errorMessage = 'Accès non autorisé';
            this.router.navigate(['/']);
            break;
          case 404:
            errorMessage = 'Ressource non trouvée';
            this.router.navigate(['/authentification/page404']);
            break;
          case 500:
            errorMessage = 'Erreur serveur, veuillez réessayer plus tard';
            this.router.navigate(['/authentification/page500'])
            break;
          default:
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            }
            break;
        }

          return throwError(() => error);
      })
    );
  }
}
