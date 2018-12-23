import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';

import { IonicModule } from '@ionic/angular';
import { TableModule } from 'primeng/table';

import { DiaryPage } from './diary.page';
import { ScheduleComponent } from './schedule/schedule.component';
import { StudentBookService } from 'src/app/services/student-boook.service';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: DiaryPage,
    children: [
      {
        path: '',
        component: ScheduleComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    TableModule,
    CommonModule,
    FormsModule,
    IonicModule,
    NgxLoadingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DiaryPage, ScheduleComponent, ProfileComponent],
  providers: [StudentBookService]
})
export class DiaryPageModule {}
