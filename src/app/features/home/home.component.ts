import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Movie, Person, TvShow } from '../../core/models/tmdb.models';
import { TmdbService } from '../../core/services/tmdb.service';

@Component({ selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css'] })
export class HomeComponent implements OnInit {
  trendMovie: Movie[] = [];
  trendPeople: Person[] = [];
  trendTv: TvShow[] = [];
  readonly imgPrefix: string;

  constructor(private tmdb: TmdbService) { this.imgPrefix = `${tmdb.imageBaseUrl}w500`; }

  ngOnInit(): void {
    forkJoin({ movies: this.tmdb.trending<Movie>('movie'), tv: this.tmdb.trending<TvShow>('tv'), people: this.tmdb.trending<Person>('person') })
      .subscribe(({ movies, tv, people }) => {
        this.trendMovie = movies.results.slice(0, 12);
        this.trendTv = tv.results.slice(0, 12);
        this.trendPeople = people.results.filter((person) => person.profile_path).slice(0, 12);
      });
  }
}
