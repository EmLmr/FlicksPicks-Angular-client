import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];

  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  //fetch user info from API
  getUser(): void {
    let username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((res: any) => {
      this.user = res;
      this.getFavoriteMovies();
      console.log(res);
    });
  }

  //fetch list of favorite movies from api
  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favoriteMovies.push(movie);
        }
      });
    });
    console.log(this.favoriteMovies);
  }

  //remove movie from favorites
  deleteFromFavorites(_id: string, Title: string): void {
    this.fetchApiData.deleteFromFavorites(_id).subscribe((resp) => {
      console.log(resp);
      this.snackBar.open(`"${Title}" removed from your favorites.`, 'OK', {
        duration: 3000,
      });
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

  //open dialog to edit user info
  openEditUserProfileDialog(): void {
    this.dialog.open(EditUserProfileComponent);
  }

  //delete user account
  deleteAccount(): void {
    if (
      confirm(
        'All data will be lost. Are you sure you want to delete your account?'
      )
    ) {
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['/welcome']);
        this.snackBar.open('You have deleted your account succesfully!', 'OK', {
          duration: 4000,
        });
      });
    }
  }
}
