import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { EmailInputComponent } from "../../common/components/forms/email-input/email-input.component";
import { FieldErrorsComponent } from "../../common/components/forms/field-errors/field-errors.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./features/login/login.component";
import { PasswordInputComponent } from "../../common/components/forms/password-input/password-input/password-input.component";
import { SignupPageComponent } from "./features/signup/signup.component";

@NgModule({
  declarations: [LoginComponent, SignupPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    EmailInputComponent,
    PasswordInputComponent,
    FieldErrorsComponent,
    RouterModule,
  ],
})
export class AuthModule {}
