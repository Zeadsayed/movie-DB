import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {
  trendperson:any[]=[];
  imgPrefix:string='https://image.tmdb.org/t/p/w500/';
  constructor(private _MoviesService:MoviesService){}

  ngOnInit(): void {
    this._MoviesService.getMovies("person").subscribe((res)=>{
      this.trendperson=res.results;
    });
  }
}
