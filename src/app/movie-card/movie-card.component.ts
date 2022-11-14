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

  /**
   * Gets movies from api call and sets the movies state to return JSON file
   * @returns array holding movies objects
   * @function getAllMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  
  /**
   * opens the user director dialog from DirectorComponent to displaying details
   * @param name
   * @param bio
   * @param birthday
   */
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

  /**
   * opens the genre dialog from GenreComponent to displaying details
   * @param name
   * @param description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {      
      data : {
        Name: name,
        Description: description
    } ,
      width: '300px'
    });
  }

  /**
   * opens the user synopsis dialog from SynopsisComponent to displaying details
   * @param title
   * @param description
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(synopsisComponent, {      
      data : {
        Title: title,
        Description: description
    } ,
      width: '300px'
    });
  }

  /**
   * Gets favorite movies from user data from api call and sets the favorite movies variable to return JSON file
   * @returns array holding ids of user's favorite movies
   * @function getUser
   */
  getFavoriteMovies(): void {
    console.log('here');
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.favoriteMovies = response.FavoriteMovies;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  /**
   * checks if a movie is included in the user's list of favorite movies
   * @param id
   * @returns true, if the movie is a favorite move, else false
   */
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }
  
  /**
   * adds a movie to the list of favorite movies via an API call
   * @param id
   * @function addFavoriteMovie
   */
  addToFavoriteMovies(id: string) {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    })
  }

  /**
   * removes a movie from the list of favorite movies via an API call
   * @param id
   * @function removeFavoriteMovie
   */
  removeFromFavoriteMovies(id: string) {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    })
  }


}
