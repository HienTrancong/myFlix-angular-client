import { Component, OnInit } from '@angular/core';
// This import brings in the API calls we created
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  //declare variable movies as an array
  movies: any[] = [];
  constructor( public fetchApiData: FetchApiDataService) { }

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
}
