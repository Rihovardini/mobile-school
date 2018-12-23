import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public fullName: string;

  public dateOfBirth: string;

  public login: string;

  public imgUrl: string;

  public loading: boolean;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.loading = true;
    this.auth.getStudent(this.auth.getCurrentUserId()).subscribe(student => {
      this.fullName = `${student.lastname} ${student.firstname} ${student.patronymic}`;
      this.dateOfBirth = student.dateOfBirth;
      this.login = student.login;
      this.imgUrl = student.avatar || '../assets/user.jpeg';
      this.loading = false;
    });
  }

}
