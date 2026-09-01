import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TvShow } from '../../core/models/tmdb.models';
import { TmdbService } from '../../core/services/tmdb.service';
import { WatchlistService } from '../../core/services/watchlist.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css'],
})
export class TvShowsComponent implements OnInit, OnDestroy {
  trendtv: TvShow[] = [];
  readonly imgPrefix: string;
  error = '';
  savedShowIds = new Set<number>();
  private readonly destroy$ = new Subject<void>();

  constructor(
    private tmdb: TmdbService,
    private watchlist: WatchlistService,
  ) {
    this.imgPrefix = `${tmdb.imageBaseUrl}w500`;
  }
  ngOnInit(): void {
    this.getTvsPage(1);
    this.watchlist.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        this.savedShowIds = new Set(
          items.filter((item) => !('title' in item)).map((item) => item.id),
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getTvsPage(page: number): void {
    this.error = '';
    this.tmdb.popularTv(page).subscribe({
      next: (response) => (this.trendtv = response.results),
      error: (error) =>
        (this.error = error.message || 'Please try again later.'),
    });
  }

  addToWatchlist(show: TvShow, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.watchlist.add(show);
  }
}
