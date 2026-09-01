export type MediaType = 'movie' | 'tv' | 'person';
export type DiscoverMediaType = 'movie' | 'tv';

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  media_type?: 'movie';
  title: string;
  original_title?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
}

export interface TvShow {
  id: number;
  media_type?: 'tv';
  name: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
}

export interface Person {
  id: number;
  media_type?: 'person';
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  known_for?: Array<Movie | TvShow>;
}

export type SearchResult = Movie | TvShow | Person;

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

export interface TmdbVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface CastMember {
  id: number;
  name: string;
  character?: string;
  profile_path: string | null;
  known_for_department?: string;
}

export interface Credits {
  cast: CastMember[];
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export interface WatchProviderRegion {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  free?: WatchProvider[];
}

export interface WatchProviderResponse {
  results: Record<string, WatchProviderRegion>;
}

export interface MovieDetails extends Movie {
  tagline: string;
  runtime: number;
  genres: Genre[];
  videos: { results: TmdbVideo[] };
  credits: Credits;
  recommendations: PaginatedResponse<Movie>;
  'watch/providers': WatchProviderResponse;
}

export interface TvDetails extends TvShow {
  tagline: string;
  episode_run_time: number[];
  number_of_seasons: number;
  genres: Genre[];
  videos: { results: TmdbVideo[] };
  credits: Credits;
  recommendations: PaginatedResponse<TvShow>;
  'watch/providers': WatchProviderResponse;
}

export interface PersonCredit {
  id: number;
  media_type: 'movie' | 'tv';
  title?: string;
  name?: string;
  character?: string;
  job?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  popularity: number;
}

export interface PersonDetails extends Person {
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  also_known_as: string[];
  combined_credits: { cast: PersonCredit[]; crew: PersonCredit[] };
}

export interface DiscoverFilters {
  genre?: number | null;
  year?: number | null;
  minRating?: number | null;
  sortBy?: string;
  page?: number;
}
