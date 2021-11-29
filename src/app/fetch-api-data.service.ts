import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//declaring the api url that will provide data for the client app
const apiUrl = 'https://flickspicks.herokuapp.com/';
const token = localStorage.getItem('token');
const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  //inject the HttpClient module to the constructor params
  //provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  //making api call for user registration endpoint
  public userRegistration(userData: any): Observable<any> {
    // console.log(userData);
    return this.http
      .post(apiUrl + 'users', userData)
      .pipe(catchError(this.handleError));
  }

  //making api call for user login endpoint
  public userLogin(userData: any): Observable<any> {
    // console.log(userData);
    return this.http
      .post(apiUrl + 'login', userData)
      .pipe(catchError(this.handleError));
  }

  //-----MOVIE REQUESTS-----//
  /**
   * Get all movies
   * @returns an array of all movies
   */
  getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get a single movie
   * @returns a single movie object, by title
   */
  getMovie(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //-----GENRE REQUESTS-----//
  /**
   * Get all genres method
   * @returns an array of all genres
   */
  getAllGenres(): Observable<any> {
    return this.http
      .get(apiUrl + 'genres', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get a single genre
   * @returns a single genre object, by genre name
   */
  getGenre(): Observable<any> {
    return this.http
      .get(apiUrl + 'genres/:gname', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //-----DIRECTOR  REQUESTS-----//
  /**
   * Get all directors method
   * @returns an array of all directors
   */
  getAllDirectors(): Observable<any> {
    return this.http
      .get(apiUrl + 'directors', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get a single director
   * @returns a single director object, by director name
   */
  getDirector(): Observable<any> {
    return this.http
      .get(apiUrl + 'directors/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //-----USER REQUESTS-----//
  /**
   * Get user; by username
   * @param username - username
   * @returns object containing user data
   */
  getUser(username: any): Observable<any> {
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Edit user info, by username
   * @param userData - username and password
   * @returns success/error message
   */ editUser(userData: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${username}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete user, by username
   * @param userData - username and password
   * @returns success/error message
   */
  deleteUser(): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get favorite movies
   * @param username - username automatically extracted from login data
   * @returns array of favorite movies
   */
  getFavorites(): Observable<any> {
    return this.http
      .get(apiUrl + `users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   *  Add movie to favorites
   * @param username - username automatically extracted from login data
   * @param _id - movie ID
   * @returns success/error message
   */
  addToFavorites(_id: string): Observable<any> {
    return this.http
      .post(apiUrl + `users/${username}/movies/${_id}`, _id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Remove movie from favorites
   * @param username - username automatically extracted from login data
   * @param _id - movie ID
   * @returns success/error message
   */
  deleteFromFavorites(_id: string): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${username}/movies/${_id}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Non-typed response extraction
   * @param res - the response to extract
   * @returns the body of the response
   */
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles the error passed as argument
   * @param error the error to handle
   * @returns the handled error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
