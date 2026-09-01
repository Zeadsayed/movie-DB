import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonCredit, PersonDetails } from '../../core/models/tmdb.models';
import { TmdbService } from '../../core/services/tmdb.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css'],
})
export class PersonDetailsComponent implements OnInit {
  person?: PersonDetails;
  credits: PersonCredit[] = [];
  readonly profileBaseUrl: string;
  readonly posterBaseUrl: string;

  constructor(
    private route: ActivatedRoute,
    private tmdb: TmdbService,
  ) {
    this.profileBaseUrl = `${tmdb.imageBaseUrl}h632`;
    this.posterBaseUrl = `${tmdb.imageBaseUrl}w500`;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;
      this.tmdb.personDetails(id).subscribe((person) => {
        this.person = person;
        this.credits = [...person.combined_credits.cast]
          .filter((credit) => credit.poster_path)
          .sort((a, b) => b.popularity - a.popularity)
          .filter(
            (credit, index, items) =>
              items.findIndex(
                (item) =>
                  item.id === credit.id &&
                  item.media_type === credit.media_type,
              ) === index,
          )
          .slice(0, 12);
      });
    });
  }

  creditTitle(credit: PersonCredit): string {
    return credit.title || credit.name || 'Untitled';
  }
  creditRoute(credit: PersonCredit): any[] {
    return [
      credit.media_type === 'movie' ? '/movieDetails' : '/tvDetails',
      credit.id,
    ];
  }
}
