import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  public userName: string;

  public password: string;

  public errorMessage: string;

  constructor(
    private authService: AuthenticationService,
    public toastController: ToastController,
    private router: Router
  ) {
    this.userName = null;
    this.password = null;
  }

  ngOnInit() {}

  login() {
    this.authService.login(this.userName, this.password).subscribe(
      result => {
        this.errorMessage = null;
        if (this.authService.getRole()) {
          this.router.navigate([this.authService.defaultRoute()]);
        }
      },
      error => {
        this.presentToastWithOptions();
        // if (error.error.status.message) {
        //   this.errorMessage = 'Ви ввели невірні дані';
        // }
      }
    );
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Дані не вірні',
      position: 'top',
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }
}
