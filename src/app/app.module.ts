import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { ToastrModule } from "ngx-toastr";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthLayoutComponent } from "./modules/shared/components/auth-layout/auth-layout.component";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { tokenInterceptor } from "./common/interceptors/token.interceptor";

@NgModule({
  declarations: [AppComponent, AuthLayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: false,
    }),
  ],
  providers: [provideHttpClient(
    withInterceptors([tokenInterceptor])
  )],
  bootstrap: [AppComponent],
})
export class AppModule {}
