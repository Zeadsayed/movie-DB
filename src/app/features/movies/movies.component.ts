import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from '../../core/models/tmdb.models';
import { TmdbService } from '../../core/services/tmdb.service';
import { WatchlistService } from '../../core/services/watchlist.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  trendMovie: Movie[] = [];
  readonly imgPrefix: string;
  error = '';
  savedMovieIds = new Set<number>();
  private readonly destroy$ = new Subject<void>();

  constructor(
    private tmdb: TmdbService,
    private watchlist: WatchlistService,
  ) {
    this.imgPrefix = `${tmdb.imageBaseUrl}w500`;
  }

  ngOnInit(): void {
    this.getMoviesPage(1);
    this.watchlist.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        this.savedMovieIds = new Set(
          items.filter((item) => 'title' in item).map((item) => item.id),
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getMoviesPage(page: number): void {
    this.error = '';
    this.tmdb.popularMovies(page).subscribe({
      next: (response) => (this.trendMovie = response.results),
      error: (error) =>
        (this.error = error.message || 'Please try again later.'),
    });
  }

  addToWatchlist(movie: Movie, event: Event): void {
    event.stopPropagation();
    this.watchlist.add(movie);
  }
}
