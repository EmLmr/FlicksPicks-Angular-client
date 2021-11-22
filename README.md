# FlicksPicksAngularClient

To build the server-side of a [movie API](https://github.com/EmLmr/movie_api) that I previously created. The web application will provide users with information about different movies, directors, and genres. Users will also be able to sign up, update their user information, and add/remove movies to/from their list of favorite movies.<br>
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Installation

- Run `npm install` to install all the dependencies
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Tech Stack

- Angular
- Angular Material

## User Stories

- As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Key Features

- The app should display a welcome view where users will be able to either log in or register an account.
- Once authenticated, the user should now view all movies.
- Upon clicking on a particular movie, users will be taken to a single movie view, where
  additional movie details will be displayed. The single movie view will contain the following
  additional features:
  - A button that when clicked takes a user to the director view, where details about the
    director of that particular movie will be displayed
  - A button that when clicked takes a user to the genre view, where details about that
    particular genre of the movie will be displayed

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
