import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { LoginGuard } from './login.guard';
import { StudentBookGuard } from '../student-book/student-book.guard';

const routes: Routes = [
  {
    path: '',
    canLoad: [LoginGuard],
    canActivate: [LoginGuard],
    component: LoginPage
  },
  {
    path: 'student-book',
    canLoad: [StudentBookGuard],
    loadChildren: '../student-book/student-book.module#StudentBookPageModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [SplashScreen, StatusBar],
  declarations: [LoginPage]
})
export class LoginPageModule {}
