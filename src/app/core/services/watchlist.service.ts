import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie, TvShow } from '../models/tmdb.models';

type WatchlistItem = Movie | TvShow;

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private readonly storageKey = 'watchlist_items';
  private readonly legacyStorageKey = 'cart_items';
  private items: WatchlistItem[] = [];
  private readonly itemsSubject = new BehaviorSubject<WatchlistItem[]>([]);
  private readonly countSubject = new BehaviorSubject<number>(0);

  readonly items$ = this.itemsSubject.asObservable();
  readonly count$ = this.countSubject.asObservable();

  constructor() {
    this.load();
  }

  private save(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch {
      // The in-memory watchlist still works when browser storage is unavailable.
    }
    this.publish();
  }

  private load(): void {
    try {
      const raw =
        localStorage.getItem(this.storageKey) ||
        localStorage.getItem(this.legacyStorageKey);
      if (raw) {
        const storedItems: unknown = JSON.parse(raw);
        this.items = Array.isArray(storedItems) ? storedItems : [];
      }
    } catch {
      this.items = [];
    }
    this.publish();
  }

  add(item: WatchlistItem): void {
    // TMDB movie and TV ids come from separate namespaces, so compare both id and type.
    if (!this.items.some((savedItem) => this.sameItem(savedItem, item))) {
      this.items.push(item);
      this.save();
    }
  }

  remove(id: number, type?: 'movie' | 'tv'): void {
    this.items = this.items.filter(
      (item) =>
        item.id !== id || (type != null && this.itemType(item) !== type),
    );
    this.save();
  }

  clear(): void {
    this.items = [];
    this.save();
  }

  private publish(): void {
    this.itemsSubject.next(this.items.slice());
    this.countSubject.next(this.items.length);
  }

  private itemType(item: WatchlistItem): 'movie' | 'tv' {
    return 'title' in item ? 'movie' : 'tv';
  }

  private sameItem(a: WatchlistItem, b: WatchlistItem): boolean {
    return a.id === b.id && this.itemType(a) === this.itemType(b);
  }
}
