//This is your app's root component. 
import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';
  // //You passed the Angular Material dialog in the constructor as an argument so that it's available for use in this component.
  // constructor(public dialog: MatDialog) {}
  // //function to open the user registration dialog component
  // openUserRegistrationDialog(): void {
  //   this.dialog.open(UserRegistrationFormComponent, {
  //     width: '280px'
  //   });
  // }
  // //function to open the user login dialog component
  // openUserLoginDialog(): void {
  //   this.dialog.open(UserLoginFormComponent, {
  //     width: '280px'
  //   });
  // }
  // //function to open movie card component
  // openMoviesDialog(): void {
  //   this.dialog.open(MovieCardComponent,{
  //     width: '1000px'
  //   });
  // }



}
