import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss'],
})
export class GenreDialogComponent implements OnInit {
  //store genres coming from the API
  genres: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getGenres();
  }

  //fetch genres from the API
  getGenres(): void {
    this.fetchApiData.getAllGenres().subscribe((response: any) => {
      this.genres = response;
      //this.genres[0] = response; //returns horror, the first genre in the array
      console.log(this.genres);
      return this.genres;
    });
  }
}
