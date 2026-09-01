# Noxe — Movie Database App

A single-page movie browsing app built with Angular, my first project with the framework. It focuses on core Angular fundamentals: routing, authenticated/guarded routes, services, and consuming a REST API reactively with RxJS.

Live demo: https://zeadsayed.github.io/movie-DB/

## Features

- User login with DummyJSON authentication and form validation
- Route guards to protect authenticated pages
- Feature/data services for API communication
- Reactive state and data flow with RxJS
- Movie data fetched from an external API
- Global TMDB multi-search and filtered discovery
- Trailers, cast, recommendations, streaming providers, and person filmographies

## TMDB configuration

TMDB requests are centralized in `TmdbService`. The `TmdbInterceptor` adds the API key from the Angular environment configuration, so credentials are not duplicated in services or request URLs.

Before running the app, add your own TMDB API key to `tmdbApiKey` in `src/environments/environment.ts`. Keep real credentials out of commits and public repositories.

Because Angular environment values are compiled into the browser bundle, they are not secret. Use a backend proxy if your deployment requires the TMDB credential to remain private.

## Tech stack

- Angular
- TypeScript
- RxJS
- HTML/CSS

## Project structure

```text
src/app/
├── core/               # Singleton services, guards, interceptors, and data models
│   ├── guards/
│   ├── interceptors/
│   ├── models/
│   └── services/
├── features/           # Route-level product features
│   ├── movies/
│   ├── tv-shows/
│   ├── discover/
│   ├── people/
│   └── watchlist/
├── layout/             # App-wide visual shell components
│   ├── navbar/
│   ├── header/
│   └── footer/
├── app-routing.module.ts
├── app.component.*
└── app.module.ts
```

Feature code stays together, application-wide state and API infrastructure live under `core`, and components that construct the site shell live under `layout`.

## Getting started

```bash
git clone https://github.com/Zeadsayed/movie-DB.git
cd movie-DB
npm install
ng serve
```

Then open http://localhost:4200 in your browser.
