import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://hien-tran-080222.herokuapp.com/';

//get token and username from local storage
const token = localStorage.getItem('token');
const userName = localStorage.getItem('username');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
 // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl+ 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
  //User login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl+ 'login', userDetails)
      .pipe(catchError(this.handleError));
  }
  //Get all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', 
        {headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }
  //Get movie by title
  public getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + `movies/${title}`, 
      {headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),})
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }
  //Get director
  public getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `director/${directorName}`, 
        {headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }
  //Get genre
  public getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `genre/${genreName}`, 
        {headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }
  //Get user
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
    .get(apiUrl + `users/${userName}`, 
      {headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),})
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }
  //Get favourite movies for a user
  public getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
    .get(apiUrl + `users/${userName}/movies`, {headers: new HttpHeaders(
      {Authorization: 'Bearer ' + token,
    }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }
  //Add a movie to favourite Movies
  public addFavoriteMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
    .post(apiUrl + `users/${userName}/movies/${movieId}`, {} ,{headers: new HttpHeaders(
      {Authorization: 'Bearer ' + token,
    }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }
  //Delete a movie from the favorite movies
  public removeFavoriteMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
    .delete(apiUrl + `users/${userName}/movies/${movieId}`,{headers: new HttpHeaders(
      {Authorization: 'Bearer ' + token,
    }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }
  //Edit user
public editUser(updateDetails: any): Observable<any> {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('user');
  return this.http
  .put(apiUrl + `users/${userName}`, updateDetails, {headers: new HttpHeaders(
      {Authorization: 'Bearer ' + token,
    }),
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError));
  }
  //Delete user
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
    .delete(apiUrl + `users/${userName}`, {headers: new HttpHeaders(
        {Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
    }

  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.log(error);
      console.error(
        `Error Status cose ${error.status}` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happended; please try again later.')
    );
  }
}
