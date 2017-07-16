import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from "@angular/http";

import { CollapseModule } from "ngx-bootstrap";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { NavComponent } from "./nav/nav.component";
import { LoginComponent } from "./login/login.component";
import { LoginFormComponent } from "./login-form/login-form.component";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CollapseModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
