import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = []; //stores the movies coming from the api
  // directors: any[] = []; //stores the directors coming from the api
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    // this.getDirectors();
    this.getUserFavorites();
  }

  //fetch movies from the api
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  // //fetch directors from the api
  // getDirectors(): void {
  //   this.fetchApiData.getAllDirectors().subscribe((response: any) => {
  //     this.directors = response;
  //     console.log(this.directors);
  //     return this.directors;
  //   });
  // }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        Name: title,
        Description: description,
      },
    });
  }

  openGenreDialog(gname: string, gdescription: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Gname: gname,
        Gdescription: gdescription,
      },
    });
  }

  getUserFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      return this.favorites;
    });
  }

  // addToFavorites(movieId: any) {
  //   console.log(movieId);
  //   this.fetchApiData.addToFavorites(movieId).subscribe((resp: any) => {
  //     console.log(resp);
  //     this.snackBar.open(
  //       `The selected movie has been added to your favorites.`,
  //       'OK',
  //       {
  //         duration: 3000,
  //       }
  //     );
  //     this.getUserFavorites();
  //   });
  // }
  addToFavorites(id: string, Title: string): void {
    this.fetchApiData.addToFavorites(id).subscribe((res: any) => {
      this.snackBar.open(`"${Title}" has been added to your favorites`, 'OK', {
        duration: 3000,
      });
      return this.getUserFavorites();
    });
  }

  deleteFromFavorites(id: string, Title: string): void {
    this.fetchApiData.deleteFromFavorites(id).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `"${Title}" has been removed from your favorites.`,
        'OK',
        {
          duration: 3000,
        }
      );
      this.getUserFavorites();
    });
  }

  setFavoriteStatus(id: any): any {
    if (this.favorites.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
