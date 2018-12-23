import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {

  constructor(public menu: MenuController) { }

  ngOnInit() {
  }

  openBar() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
