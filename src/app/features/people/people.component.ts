import { Component, OnInit } from '@angular/core';
import { Person } from '../../core/models/tmdb.models';
import { TmdbService } from '../../core/services/tmdb.service';

@Component({ selector: 'app-people', templateUrl: './people.component.html', styleUrls: ['./people.component.css'] })
export class PeopleComponent implements OnInit {
  trendperson: Person[] = [];
  readonly imgPrefix: string;
  constructor(private tmdb: TmdbService) { this.imgPrefix = `${tmdb.imageBaseUrl}w500`; }
  ngOnInit(): void { this.tmdb.trending<Person>('person').subscribe((response) => (this.trendperson = response.results.filter((person) => person.profile_path))); }
}
