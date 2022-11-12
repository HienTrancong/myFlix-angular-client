import { Component, OnInit } from '@angular/core';
// This import brings in the API calls we created
import { FetchApiDataService } from '../fetch-api-data.service';
// Dialog model
import { MatDialog } from '@angular/material/dialog'
//Router to Edit profile view
import { Router } from '@angular/router';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  //declare variable movies as an array
  user: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void { 
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
      return this.user;
    });
  }

  openEditProfileDialog(): void{
    this.dialog.open(EditProfileComponent, {
      width: '300px'
    });
  }

  deleteAccount(): void {
    if(confirm('Are you sure you want to delete your profile? This cannot be undone')) {
      this.router.navigate(['welcome']);
      this.snackBar.open('Profile deleted successfully!', 'OK', {
        duration: 2000
      });
      this.fetchApiData.deleteUser().subscribe((response: any) => {
        console.log(response);
        localStorage.clear();
      });
    }
  }



}
