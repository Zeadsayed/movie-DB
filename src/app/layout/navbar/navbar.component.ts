import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { WatchlistService } from '../../core/services/watchlist.service';
import {
  Movie,
  Person,
  SearchResult,
  TvShow,
} from '../../core/models/tmdb.models';
import { TmdbService } from '../../core/services/tmdb.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLogin = false;
  displayName: string | null = null;
  watchlistCount = 0;
  searching = false;
  searchOpen = false;
  searchResults: SearchResult[] = [];
  searchControl = new FormControl('', { nonNullable: true });
  readonly imageBaseUrl: string;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private watchlist: WatchlistService,
    private tmdb: TmdbService,
  ) {
    this.imageBaseUrl = `${tmdb.imageBaseUrl}w185`;
  }

  ngOnInit(): void {
    this.auth.userData.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.isLogin = user != null;
      this.displayName = this.isLogin ? localStorage.getItem('username') : null;
    });
    this.watchlist.count$
      .pipe(takeUntil(this.destroy$))
      .subscribe((count) => (this.watchlistCount = count));
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged(),
        tap((query) => {
          this.searchOpen = query.trim().length >= 2;
          this.searching = this.searchOpen;
          if (!this.searchOpen) this.searchResults = [];
        }),
        filter((query) => query.trim().length >= 2),
        switchMap((query) =>
          this.tmdb
            .searchMulti(query.trim())
            .pipe(
              catchError(() =>
                of({ page: 1, results: [], total_pages: 0, total_results: 0 }),
              ),
            ),
        ),
      )
      .subscribe((response) => {
        this.searchResults = response.results
          .filter((item) => this.resultImage(item))
          .slice(0, 6);
        this.searching = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  closeSearch(): void {
    this.searchOpen = false;
    this.searchControl.setValue('', { emitEvent: false });
  }
  logOut(): void {
    this.auth.logOut();
  }
  resultTitle(item: SearchResult): string {
    return 'title' in item ? item.title : item.name;
  }
  resultImage(item: SearchResult): string | null {
    return 'profile_path' in item ? item.profile_path : item.poster_path;
  }
  resultType(item: SearchResult): string {
    return item.media_type === 'tv'
      ? 'TV show'
      : item.media_type === 'person'
        ? 'Person'
        : 'Movie';
  }
  resultRoute(item: SearchResult): any[] {
    return [
      item.media_type === 'tv'
        ? '/tvDetails'
        : item.media_type === 'person'
          ? '/person'
          : '/movieDetails',
      item.id,
    ];
  }
}
