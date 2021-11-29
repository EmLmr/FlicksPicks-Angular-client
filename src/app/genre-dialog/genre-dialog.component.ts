import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss'],
})
export class GenreDialogComponent implements OnInit {
  genres: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      _id: string;
    }
  ) {}

  ngOnInit(): void {
    this.getGenreDetails();
  }

  getGenreDetails(): void {
    this.fetchApiData.getAllGenres().subscribe((response: any) => {
      this.genres = response;
      return this.genres;
    });
  }
}
