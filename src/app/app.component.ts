import { Component } from '@angular/core';
//dialog for user login and registration
import { MatDialog } from '@angular/material/dialog';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'FlicksPicks-Angular-client';

  constructor(public dialog: MatDialog) {}
  //will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      //dialog width
      width: '280px',
    });
  }
  //will open the dialog when the sign up button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
