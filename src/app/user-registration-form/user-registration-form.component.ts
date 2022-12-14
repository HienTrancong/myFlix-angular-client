import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//@Component decorator to tell Angular that the class right below is a component.
@Component({
  //selector property that defines the custom HTML element, into which this component will render
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  //the @Input decorator that defines the component’s input, which bind to ngModel in html
  @Input() userData = { Username:'', Password:'', Email:'', Birthday:'' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }
 
  //ngOnInit method is called once the component has received all its inputs
  ngOnInit(): void {
  }
  
  /**
   * sends form inputs for user registration to backend via fetchApiData Service
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
    this.dialogRef.close(); // This will close the modal on success
    console.log(response);
    this.snackBar.open('user register successfully!', 'OK', {
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
