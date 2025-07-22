import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../common/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../common/services/notification.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-login",
  standalone: false,
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  isLoading = false;
  loginForm!: FormGroup;
  signup = "/auth/signup";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    console.log("Submit button clicked");

    if (this.loginForm.invalid) {
      console.warn("Form is invalid", this.loginForm.errors);
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        if (control && control.invalid) {
          console.warn(`${key} errors:`, control.errors);
        }
      });
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    console.log("Sending login request with:", { email, password });

    this.isLoading = true;

    this.authService
      .login({ email, password })
      // .pipe(
      //   finalize(() => {
      //     console.log(" Login request finalized");
      //     this.isLoading = false;
      //   })
      // )
      .subscribe({
        next: () => {
          console.log("Login successful");
          this.notificationService.showSuccess("Login Successful");
          this.router.navigate(["auth/home"]);
        },
        error: (err: unknown) => {
          console.error("Login error occurred", err);
          let message = "Login failed";

          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              // Client-side or network error
              message =
                "Could not connect to the server. Please check your network connection or make sure the backend is running.";
            } else if (err.error) {
              const body = err.error;
              if (body.errors?.length) {
                message = body.errors.join(", ");
              } else if (body.message) {
                message = body.message;
              } else {
                message = err.statusText || message;
              }
            } else {
              message = err.statusText || message;
            }
          } else if (err instanceof Error) {
            message = err.message;
          }

          this.notificationService.showError(message);
          this.isLoading = false; // Ensure loading spinner stops
        },
      });
  }
}