import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./features/login/login.component";
import { AuthLayoutComponent } from "../shared/components/auth-layout/auth-layout.component";
import { SignupPageComponent } from "./features/signup/signup.component";
import { ContactComponent } from "./features/contact/contact.component";

const routes: Routes = [
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      { path: "signup", component: SignupPageComponent },
      { path: "login", component: LoginComponent },
      {path:'home',component:ContactComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
