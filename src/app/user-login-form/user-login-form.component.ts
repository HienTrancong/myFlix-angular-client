import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  //selector property that defines the custom HTML element, into which this component will render
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  //the @Input decorator that defines the component’s input
  @Input() userData = { Username:'', Password:''};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { 

  }

  loginUser(): void {
    //The userData object will then be passed into the API call in the registerUser function.
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      // This will close the modal on success!
      this.dialogRef.close();
      console.log(response);
      //Add token and user name to local storage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', response.user.Username);
      this.snackBar.open('user login successfully!', 'OK', {
        duration: 2000
      });
      }, (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      });
    }

}
