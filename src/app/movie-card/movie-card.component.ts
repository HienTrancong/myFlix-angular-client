import { Component, OnInit } from '@angular/core';
// This import brings in the API calls we created
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { synopsisComponent } from '../synopsis/synopsis.component';

// Dialog model
import { MatDialog } from '@angular/material/dialog'
import { BinaryOperator } from '@angular/compiler';



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
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
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
