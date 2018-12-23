import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentBookGuard } from './public/student-book/student-book.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: './public/login/login.module#LoginPageModule'
  },
  {
    canLoad: [StudentBookGuard],
    canActivate: [StudentBookGuard],
    path: 'student-book',
    loadChildren:
      './public/student-book/student-book.module#StudentBookPageModule'
  },
  { path: 'diary', loadChildren: './public/diary/diary.module#DiaryPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

