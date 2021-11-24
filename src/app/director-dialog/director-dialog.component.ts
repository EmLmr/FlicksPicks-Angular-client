import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss'],
})
export class DirectorDialogComponent implements OnInit {
  directors: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
    }
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.getDirectorDetails();
  }

  getDirectorDetails(): void {
    this.fetchApiData.getAllDirectors().subscribe((response: any) => {
      this.directors = response;
      console.log(this.directors);
      return this.directors;
    });
  }
}
