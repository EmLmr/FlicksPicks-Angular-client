import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  //stores the movies coming from the API
  movies: any[] = [];
  //stores the movies coming from the API
  genres: any[] = [];
  //stores the favorite movies coming from the API
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorites();
  }

  //fetch all movie from the API
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  //open dialog to get movie synopsis
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        Name: title,
        Description: description,
      },
    });
  }

  //open dialog to get genre info
  openGenreDialog(_id: string): void {
    this.dialog.open(GenreDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '50%',
      data: {
        _id: _id,
      },
    });
  }

  //open dialog to get director info
  openDirectorDialog(name: string): void {
    this.dialog.open(DirectorDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '70%',
      height: '70%',
      data: {
        Name: name,
      },
    });
  }

  //get user favorite movies based off user info stored in localStorage
  getUserFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      return this.favorites;
    });
  }

  //add movie to favorites
  addToFavorites(id: string, Title: string): void {
    this.fetchApiData.addToFavorites(id).subscribe((res: any) => {
      this.snackBar.open(`"${Title}" added to favorites.`, 'OK', {
        duration: 3000,
      });
      return this.getUserFavorites();
    });
  }

  //delete movie from favorites
  deleteFromFavorites(id: string, Title: string): void {
    this.fetchApiData.deleteFromFavorites(id).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`"${Title}" removed from favorites.`, 'OK', {
        duration: 3000,
      });
      this.getUserFavorites();
    });
  }

  //toggle "favorite" status for a movie
  setFavoriteStatus(id: any): any {
    if (this.favorites.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
