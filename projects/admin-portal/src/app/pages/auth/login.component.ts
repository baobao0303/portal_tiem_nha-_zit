import { Component, inject, Type, forwardRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { SignInCommandHandler, SignInGoogleCommandHandler } from '@application/commands';
import { SignInRequest } from '@application/messages';
import { CanCommandDirective, VIEW_COMMAND_REGISTRY, VIEW_CONTEXT, VIEW_RENDER_REGISTRY, ViewBase, ViewCommandRegistry, ViewRenderRegistry } from '@view/base';
import { LoginContext } from './login.context';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    LucideAngularModule
  ],
  hostDirectives: [CanCommandDirective],
  templateUrl: './login.component.html',
  providers: [
    SignInCommandHandler,
    SignInGoogleCommandHandler,
    LoginContext,
    { provide: VIEW_COMMAND_REGISTRY, useExisting: forwardRef(() => LoginComponent) },
    { provide: VIEW_CONTEXT, useExisting: LoginContext },
    { provide: VIEW_RENDER_REGISTRY, useExisting: forwardRef(() => LoginComponent) }
  ]
})
export class LoginComponent extends ViewBase implements ViewCommandRegistry, ViewRenderRegistry, OnInit {
  public context = inject(LoginContext);

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    // Initialization logic if any
  }

  viewType(): Type<ViewRenderRegistry> {
    return this.constructor as Type<ViewRenderRegistry>;
  }

  viewName(): string {
    return 'LOGIN';
  }

  commandRegister(): void {
    // Shortcut command assignments can be registered here
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const request = new SignInRequest();
    request.email = this.loginForm.value.email!;
    request.password = this.loginForm.value.password!;

    this.context.login(request);
  }

  public loginWithGoogle(): void {
    const google = (window as any).google;
    if (!google) {
      this.context.errorMessage.set('Google Login is not available');
      return;
    }

    const client = google.accounts.oauth2.initTokenClient({
      client_id: '414543704522-u2omck5jf8jcvvibme86qnu28tiq2tkv.apps.googleusercontent.com',
      scope: 'openid email profile',
      callback: async (tokenResponse: any) => {
        if (tokenResponse.error) {
          this.context.errorMessage.set('Google Login failed');
          return;
        }

        try {
          const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          });
          const googleUser = await userInfoRes.json();

          this.context.googleLogin(googleUser);
        } catch (error) {
          this.context.setViewState('ERROR');
          this.context.errorMessage.set('An error occurred during Google Sign-In');
        }
      },
    });

    client.requestAccessToken();
  }
}
