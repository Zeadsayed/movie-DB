import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DiscoverFilters,
  DiscoverMediaType,
  GenreResponse,
  MediaType,
  Movie,
  MovieDetails,
  PaginatedResponse,
  Person,
  PersonDetails,
  SearchResult,
  TvDetails,
  TvShow,
} from '../models/tmdb.models';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  readonly imageBaseUrl = 'https://image.tmdb.org/t/p/';
  private readonly apiBaseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  trending<T extends Movie | TvShow | Person>(
    type: MediaType,
    window: 'day' | 'week' = 'day',
  ): Observable<PaginatedResponse<T>> {
    return this.http.get<PaginatedResponse<T>>(
      `${this.apiBaseUrl}/trending/${type}/${window}`,
    );
  }

  popularMovies(page = 1): Observable<PaginatedResponse<Movie>> {
    return this.http.get<PaginatedResponse<Movie>>(
      `${this.apiBaseUrl}/movie/popular`,
      { params: { page } },
    );
  }

  popularTv(page = 1): Observable<PaginatedResponse<TvShow>> {
    return this.http.get<PaginatedResponse<TvShow>>(
      `${this.apiBaseUrl}/tv/popular`,
      { params: { page } },
    );
  }

  searchMulti(
    query: string,
    page = 1,
  ): Observable<PaginatedResponse<SearchResult>> {
    return this.http.get<PaginatedResponse<SearchResult>>(
      `${this.apiBaseUrl}/search/multi`,
      {
        params: { query, page, include_adult: false },
      },
    );
  }

  genres(type: DiscoverMediaType): Observable<GenreResponse> {
    return this.http.get<GenreResponse>(
      `${this.apiBaseUrl}/genre/${type}/list`,
    );
  }

  discover(
    type: DiscoverMediaType,
    filters: DiscoverFilters,
  ): Observable<PaginatedResponse<Movie | TvShow>> {
    let params = new HttpParams()
      .set('page', filters.page || 1)
      .set('sort_by', filters.sortBy || 'popularity.desc')
      .set('include_adult', false)
      .set('vote_count.gte', 25);

    if (filters.genre) params = params.set('with_genres', filters.genre);
    if (filters.minRating)
      params = params.set('vote_average.gte', filters.minRating);
    if (filters.year)
      params = params.set(
        type === 'movie' ? 'primary_release_year' : 'first_air_date_year',
        filters.year,
      );

    return this.http.get<PaginatedResponse<Movie | TvShow>>(
      `${this.apiBaseUrl}/discover/${type}`,
      { params },
    );
  }

  movieDetails(id: string | number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.apiBaseUrl}/movie/${id}`, {
      params: {
        append_to_response: 'videos,credits,recommendations,watch/providers',
      },
    });
  }

  tvDetails(id: string | number): Observable<TvDetails> {
    return this.http.get<TvDetails>(`${this.apiBaseUrl}/tv/${id}`, {
      params: {
        append_to_response: 'videos,credits,recommendations,watch/providers',
      },
    });
  }

  personDetails(id: string | number): Observable<PersonDetails> {
    return this.http.get<PersonDetails>(`${this.apiBaseUrl}/person/${id}`, {
      params: { append_to_response: 'combined_credits' },
    });
  }
}
