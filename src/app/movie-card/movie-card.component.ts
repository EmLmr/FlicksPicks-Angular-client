import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = []; //stores the movies coming from the api
  directors: any[] = []; //stores the directors coming from the api
  genres: any[] = []; //stores the genres coming from the api
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getDirectors();
    this.getGenres();
  }

  //fetch movies from the api
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  //fetch directors from the api
  getDirectors(): void {
    this.fetchApiData.getAllDirectors().subscribe((response: any) => {
      this.directors = response;
      console.log(this.directors);
      return this.directors;
    });
  }

  //fetch genres from the api
  getGenres(): void {
    this.fetchApiData.getAllGenres().subscribe((response: any) => {
      this.genres = response;
      console.log(this.genres);
      return this.genres;
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        Name: title,
        Description: description,
      },
    });
  }
}
