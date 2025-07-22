import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../common/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../common/services/notification.service';

@Component({
  selector: "app-signup",
  standalone: false,
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupPageComponent {
  signupForm: FormGroup;
  login = "/auth/login";
  errorMessage: string | null = null;

  @Input() content = "Create Account";
  @Input() firstNameLabel = "First Name";
  @Input() lastNameLabel = "Last Name";
  @Input() emailLabel = "Email";
  @Input() passwordLabel = "Password";
  @Input() confirmPasswordLabel = "Confirm Password";
  @Input() phoneLabel = "Phone Number";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.signupForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: [
        "",
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { firstName, lastName, email, phoneNumber, password } =
        this.signupForm.value;

      this.authService
        .register({ firstName, lastName, email, phoneNumber, password })
        .subscribe({
          next: () => {
            this.notificationService.showSuccess("Registration successful!");
            this.router.navigate(["/auth/login"]);
          },
          error: (err) => {
            const errors = err?.error?.errors;

            if (Array.isArray(errors) && errors.length > 0) {
              for (const errorMsg of errors) {
                if (errorMsg.includes("Email already exists")) {
                  this.notificationService.showError(
                    "This email is already registered."
                  );
                } else if (
                  errorMsg.includes(
                    "Passwords must have at least one uppercase"
                  )
                ) {
                  this.notificationService.showError(
                    "Passwords must have at least one uppercase letter."
                  );
                } else {
                  this.notificationService.showError(errorMsg);
                }
              }
            } else {
              this.notificationService.showError(
                err.message || "Registration failed!"
              );
            }
          },
        });
    } else {
      this.signupForm.markAllAsTouched();
      this.notificationService.showError(
        "Please fill in all the required fields."
      );
    }
  }
}