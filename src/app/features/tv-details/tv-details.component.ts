import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CastMember,
  TmdbVideo,
  TvDetails,
  TvShow,
  WatchProvider,
  WatchProviderRegion,
} from '../../core/models/tmdb.models';
import { TmdbService } from '../../core/services/tmdb.service';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css'],
})
export class TvDetailsComponent implements OnInit {
  tvDetails?: TvDetails;
  trailers: TmdbVideo[] = [];
  cast: CastMember[] = [];
  recommendations: TvShow[] = [];
  providerRegion?: WatchProviderRegion;
  readonly imgPrefix: string;
  readonly profilePrefix: string;
  readonly logoPrefix: string;

  constructor(
    private route: ActivatedRoute,
    private tmdb: TmdbService,
  ) {
    this.imgPrefix = `${tmdb.imageBaseUrl}w500`;
    this.profilePrefix = `${tmdb.imageBaseUrl}w342`;
    this.logoPrefix = `${tmdb.imageBaseUrl}w92`;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;
      this.tmdb.tvDetails(id).subscribe((details) => {
        this.tvDetails = details;
        this.trailers = details.videos.results
          .filter(
            (video) =>
              video.site === 'YouTube' &&
              ['Trailer', 'Teaser'].includes(video.type),
          )
          .slice(0, 3);
        this.cast = details.credits.cast
          .filter((person) => person.profile_path)
          .slice(0, 10);
        this.recommendations = details.recommendations.results
          .filter((show) => show.poster_path)
          .slice(0, 8);
        this.providerRegion =
          details['watch/providers'].results['EG'] ||
          details['watch/providers'].results['US'];
        window.scrollTo({ top: 0 });
      });
    });
  }

  providers(): WatchProvider[] {
    return (
      this.providerRegion?.flatrate ||
      this.providerRegion?.free ||
      this.providerRegion?.rent ||
      this.providerRegion?.buy ||
      []
    );
  }
  trailerUrl(video: TmdbVideo): string {
    return `https://www.youtube.com/watch?v=${video.key}`;
  }
  trailerImage(video: TmdbVideo): string {
    return `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;
  }
}
