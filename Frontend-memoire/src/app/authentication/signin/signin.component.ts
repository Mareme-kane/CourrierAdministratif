import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth/auth.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { LoginRequest } from 'src/app/core/models/user';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    standalone: false
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  loginForm: UntypedFormGroup;
  submitted = false;
  error = '';
  hide = true;
  
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], 
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });

    if (this.authService.isAuthenticated) {
      this.router.navigate([this.getDefaultRoute()]);
    }
  }

  private getDefaultRoute(): string {
    return '/dashboard/tableau-de-bord';
  }
  get f() {
    return this.loginForm?.controls || {};
  }
  onSubmit() {
    this.submitted = true;
    this.error = '';
    if (this.loginForm.invalid) {
      this.error = 'Email and Password not valid !';
      return;
    } else {
      const loginRequest: LoginRequest = {
        email_ens_pro: this.f.email.value,
        password: this.f.password.value
      };
      this.subs.sink = this.authService
        .login(loginRequest)
        .subscribe(
          (res) => {
            if (res && res.status === 'success') {
              console.log('Connexion réussie', res.data);
              // Navigation is handled by AuthService based on user role
            } else {
              this.error = 'Invalid Login';
            }
          },
          (error) => {
            console.log('Erreur de connexion:', error);
            if (error.status === 401) {
              this.error = 'Nom d\'utilisateur ou mot de passe incorrect';
            } else if (error.status === 0) {
              this.error = 'Impossible de se connecter au serveur';
            } else {
              this.error = error.error?.message || 'Erreur de connexion';
            }
            this.submitted = false;
          }
        );
    }
  }
}
