import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { EmailInputComponent } from "../../common/components/forms/email-input/email-input.component";
import { PasswordInputComponent } from "../../common/components/forms/password-input/password-input.component";
import { FieldErrorsComponent } from "../../common/components/forms/field-errors/field-errors.component";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    EmailInputComponent,
    PasswordInputComponent,
    FieldErrorsComponent
]
})
export class AuthModule { }
