import { Component, OnInit, Input } from '@angular/core';
//close dialog on success
import { MatDialogRef } from '@angular/material/dialog';
//import api calls
import { FetchApiDataService } from '../fetch-api-data.service';
//display notifications back to user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  //send form input to backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        //store user data to local storage
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('token', response.token);
        //close the modal on success
        this.dialogRef.close();
        this.snackBar.open('Log in successful!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
