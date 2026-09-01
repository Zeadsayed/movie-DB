import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Movie } from '../../core/models/tmdb.models';
import { TmdbService } from '../../core/services/tmdb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  readonly imgPrefix: string;
  readonly backdropPrefix: string;
  @Input() headertrendmovies: Movie[] = [];

  constructor(tmdb: TmdbService) {
    this.imgPrefix = `${tmdb.imageBaseUrl}w500`;
    this.backdropPrefix = `${tmdb.imageBaseUrl}original`;
  }

  readonly customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    nav: true,
    navSpeed: 800,
    smartSpeed: 800,
    margin: 16,
    stagePadding: 52,
    autoplay: true,
    autoplayTimeout: 4200,
    autoplayHoverPause: true,
    navText: [
      '<i class="fa-solid fa-arrow-left" aria-hidden="true"></i>',
      '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: { items: 1, stagePadding: 12 },
      576: { items: 1, stagePadding: 32 },
      992: { items: 1, stagePadding: 52 },
    },
  };

  get featuredMovie(): Movie | undefined {
    return this.headertrendmovies[0];
  }
}
