import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { StudentBookPage } from './student-book.page';
import { DiaryPage } from '../diary/diary.page';
import { DiaryPageModule } from '../diary/diary.module';

const routes: Routes = [
  {
    path: '',
    component: StudentBookPage,
    children: [{
      path: 'diary',
      loadChildren: '../diary/diary.module#DiaryPageModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiaryPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentBookPage]
})
export class StudentBookPageModule {}
