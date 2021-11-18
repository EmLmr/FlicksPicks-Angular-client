import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = []; //stores the movies coming from the api
  directors: any[] = []; //stores the directors coming from the api

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getDirectors();
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
}
