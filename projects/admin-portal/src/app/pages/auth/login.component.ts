import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInCommandHandler } from '@application/commands';
import { SignInRequest } from '@application/messages';
import { BROWSER_STORAGE } from '@infrastructure/base';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private signInHandler = inject(SignInCommandHandler);
  private router = inject(Router);
  private storage = inject(BROWSER_STORAGE);

  public isLoading = signal(false);
  public errorMessage = signal<string | null>(null);

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const request = new SignInRequest();
    request.email = this.loginForm.value.email!;
    request.password = this.loginForm.value.password!;

    this.signInHandler.handle(request).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.storage.set('ADMIN_SESSION', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading.set(false);
        const serverMessage = err.error?.message || 'Unauthorized or network error';
        this.errorMessage.set(serverMessage);
      }
    });
  }
}
