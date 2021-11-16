import { Component, OnInit, Input } from '@angular/core';

//close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//import api calls
import { FetchApiDataService } from '../fetch-api-data.service';

//display notifications back to user
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  //send form input to backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        //------LOGIC FOR SUCCESSFULL LOGIN GOES HERE------\\

        this.dialogRef.close(); //close the modal on success
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
