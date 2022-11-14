
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

    //the @Input decorator that defines the component’s input, which bind to ngModel in html
    //any object
    @Input() userData: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
    ) { }
  ngOnInit(): void {
  }

  /**
   * allows user to edit their data, such as Username, password, email, and birthday
   */
  editUser(): void {
    console.log(this.userData);
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
    this.dialogRef.close();
    console.log(response);
    this.snackBar.open('User profile changed successfully!', 'OK', {
      duration: 2000
    });
    //logout and ask for re-login if user change username or password
    if (this.userData.Username || this.userData.Password) {
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open('Please login again with new credentials', 'OK', {
      duration: 2000
      });
      }
    });
  }
}
