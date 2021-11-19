import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  //route to user profile
  toProfile(): void {
    this.router
      .navigate(['/profile'])
      .then((success) => console.log('navigation success?', success))
      .catch(console.error);
  }

  //route to Movies view (main page)
  toMovies(): void {
    this.router
      .navigate(['/movies'])
      .then((success) => console.log('navigation success?', success))
      .catch(console.error);
  }

  //route to Directors view
  toDirectors(): void {
    this.router
      .navigate(['/directors'])
      .then((success) => console.log('navigation success?', success))
      .catch(console.error);
  }

  //route to Genres view
  toGenres(): void {
    this.router
      .navigate(['/genres'])
      .then((success) => console.log('navigation success?', success))
      .catch(console.error);
  }

  //route to home/main page
  backToHome(): void {
    this.router
      .navigate(['/movies'])
      .then((success) => console.log('navigation success?', success))
      .catch(console.error);
  }

  //log out user and redirect to Welcome page
  logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router
      .navigate(['/welcome'])
      .then((success) => console.log('navigation success?', success))
      .catch(console.error);
  }
}
