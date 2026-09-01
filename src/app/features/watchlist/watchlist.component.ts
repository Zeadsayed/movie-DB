import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie, TvShow } from '../../core/models/tmdb.models';
import { TmdbService } from '../../core/services/tmdb.service';
import { WatchlistService } from '../../core/services/watchlist.service';

type WatchlistItem = Movie | TvShow;
type MediaFilter = 'all' | 'movie' | 'tv';
type SortOption = 'added' | 'rating' | 'newest' | 'title';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit, OnDestroy {
  items: WatchlistItem[] = [];
  filter: MediaFilter = 'all';
  sort: SortOption = 'added';
  searchTerm = '';
  showClearConfirmation = false;
  undoMessage = '';
  readonly imgPrefix: string;

  private subscription?: Subscription;
  private undoItems: WatchlistItem[] = [];
  private undoTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private watchlist: WatchlistService,
    tmdb: TmdbService,
  ) {
    this.imgPrefix = `${tmdb.imageBaseUrl}w500`;
  }

  ngOnInit(): void {
    this.subscription = this.watchlist.items$.subscribe(
      (items) => (this.items = items.slice()),
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    if (this.undoTimer) clearTimeout(this.undoTimer);
  }

  get visibleItems(): WatchlistItem[] {
    const query = this.searchTerm.trim().toLocaleLowerCase();
    const filtered = this.items.filter((item) => {
      const matchesType =
        this.filter === 'all' || this.itemType(item) === this.filter;
      const matchesSearch =
        !query || this.itemTitle(item).toLocaleLowerCase().includes(query);
      return matchesType && matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (this.sort === 'rating')
        return (b.vote_average || 0) - (a.vote_average || 0);
      if (this.sort === 'newest')
        return this.itemDate(b).localeCompare(this.itemDate(a));
      if (this.sort === 'title')
        return this.itemTitle(a).localeCompare(this.itemTitle(b));
      return this.items.indexOf(b) - this.items.indexOf(a);
    });
  }

  get movieCount(): number {
    return this.items.filter((item) => this.itemType(item) === 'movie').length;
  }

  get tvCount(): number {
    return this.items.length - this.movieCount;
  }

  remove(item: WatchlistItem): void {
    this.watchlist.remove(item.id, this.itemType(item));
    this.beginUndo([item], `${this.itemTitle(item)} removed`);
  }

  requestClear(): void {
    this.showClearConfirmation = true;
  }
  cancelClear(): void {
    this.showClearConfirmation = false;
  }

  clear(): void {
    const removed = this.items.slice();
    this.watchlist.clear();
    this.showClearConfirmation = false;
    this.beginUndo(removed, 'Watchlist cleared');
  }

  undo(): void {
    this.undoItems.forEach((item) => this.watchlist.add(item));
    this.dismissUndo();
  }

  dismissUndo(): void {
    this.undoItems = [];
    this.undoMessage = '';
    if (this.undoTimer) clearTimeout(this.undoTimer);
  }

  clearFilters(): void {
    this.filter = 'all';
    this.searchTerm = '';
  }

  itemTitle(item: WatchlistItem): string {
    return 'title' in item ? item.title : item.name;
  }
  itemDate(item: WatchlistItem): string {
    return (
      ('release_date' in item ? item.release_date : item.first_air_date) || ''
    );
  }
  itemYear(item: WatchlistItem): string {
    return this.itemDate(item).slice(0, 4) || 'Date unavailable';
  }
  itemType(item: WatchlistItem): 'movie' | 'tv' {
    return 'title' in item ? 'movie' : 'tv';
  }
  itemRoute(item: WatchlistItem): any[] {
    return [
      this.itemType(item) === 'movie' ? '/movieDetails' : '/tvDetails',
      item.id,
    ];
  }
  trackByItem(_index: number, item: WatchlistItem): string {
    const type = 'title' in item ? 'movie' : 'tv';
    return `${type}-${item.id}`;
  }

  private beginUndo(items: WatchlistItem[], message: string): void {
    if (this.undoTimer) clearTimeout(this.undoTimer);
    this.undoItems = items;
    this.undoMessage = message;
    this.undoTimer = setTimeout(() => this.dismissUndo(), 6000);
  }
}
