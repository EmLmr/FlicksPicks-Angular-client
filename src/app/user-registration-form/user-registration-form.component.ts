import { Component, OnInit, Input } from '@angular/core';

//close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//import api calls
import { FetchApiDataService } from '../fetch-api-data.service';

//display notifications back to user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  //send form input to backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        this.dialogRef.close(); //close the modal on success
        this.snackBar.open('Registration successful!', 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
