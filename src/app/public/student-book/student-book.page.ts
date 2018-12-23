import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-student-book',
  templateUrl: './student-book.page.html',
  styleUrls: ['./student-book.page.scss']
})
export class StudentBookPage implements OnInit {
  public hide = true;
  constructor(
    public authService: AuthenticationService,
    public menu: MenuController
  ) {}

  ngOnInit() {}

  openBar() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  closeBar() {
    this.menu.close('first');
  }
}
