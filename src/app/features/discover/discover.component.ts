import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DiscoverMediaType, Genre, Movie, TvShow } from '../../core/models/tmdb.models';
import { TmdbService } from '../../core/services/tmdb.service';

@Component({ selector: 'app-discover', templateUrl: './discover.component.html', styleUrls: ['./discover.component.css'] })
export class DiscoverComponent implements OnInit {
  readonly imageBaseUrl: string;
  genres: Genre[] = [];
  results: Array<Movie | TvShow> = [];
  loading = false;
  error = '';
  currentPage = 1;
  totalPages = 1;

  filterForm = new FormGroup({
    type: new FormControl<DiscoverMediaType>('movie', { nonNullable: true }),
    genre: new FormControl<number | null>(null),
    year: new FormControl<number | null>(null),
    minRating: new FormControl<number>(0, { nonNullable: true }),
    sortBy: new FormControl<string>('popularity.desc', { nonNullable: true }),
  });

  constructor(private tmdb: TmdbService) {
    this.imageBaseUrl = `${tmdb.imageBaseUrl}w500`;
  }

  ngOnInit(): void {
    this.loadGenres();
    this.search();
    this.filterForm.controls.type.valueChanges.subscribe(() => {
      this.filterForm.controls.genre.setValue(null);
      const sortBy = this.filterForm.controls.sortBy.value;
      if (sortBy.includes('release_date') || sortBy.includes('first_air_date')) {
        this.filterForm.controls.sortBy.setValue(
          this.filterForm.controls.type.value === 'movie' ? 'primary_release_date.desc' : 'first_air_date.desc',
        );
      }
      this.loadGenres();
      this.search();
    });
  }

  loadGenres(): void {
    this.tmdb.genres(this.filterForm.controls.type.value).subscribe((response) => (this.genres = response.genres));
  }

  search(page = 1): void {
    this.loading = true;
    this.error = '';
    this.tmdb.discover(this.filterForm.controls.type.value, { ...this.filterForm.getRawValue(), page }).subscribe({
      next: (response) => {
        this.results = response.results.filter((item) => item.poster_path);
        this.currentPage = response.page;
        this.totalPages = Math.min(response.total_pages, 500);
        this.loading = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: () => {
        this.error = 'Discover results could not be loaded.';
        this.loading = false;
      },
    });
  }

  title(item: Movie | TvShow): string { return 'title' in item ? item.title : item.name; }
  date(item: Movie | TvShow): string { return 'release_date' in item ? item.release_date : item.first_air_date; }
  detailsRoute(item: Movie | TvShow): any[] { return [this.filterForm.controls.type.value === 'movie' ? '/movieDetails' : '/tvDetails', item.id]; }
}
