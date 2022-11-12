import { Component, OnInit } from '@angular/core';
// This import brings in the API calls we created
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { synopsisComponent } from '../synopsis/synopsis.component';

// Dialog model
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  //declare variable movies as an array
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor( 
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
    ) { }

  //similarto componentdidmount, when component created, immediately call getMovies function
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    console.log('here');
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.favoriteMovies = response.FavoriteMovies;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }
  
  addToFavoriteMovies(id: string) {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    })
  }

  removeFromFavoriteMovies(id: string) {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    })
  }

  openDirectorDialog(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
      data : {
        Name: name,
        Bio: bio,
        Birth: birthday
      } ,
      width: '300px'
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {      
      data : {
        Name: name,
        Description: description
    } ,
      width: '300px'
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(synopsisComponent, {      
      data : {
        Title: title,
        Description: description
    } ,
      width: '300px'
    });
  }

}
