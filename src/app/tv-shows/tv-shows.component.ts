import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent {
  trendtv:any[]=[];
  imgPrefix:string='https://image.tmdb.org/t/p/w500/';
  constructor(private _MoviesService:MoviesService){}

  ngOnInit(): void {
    this._MoviesService.getMovies("tv").subscribe((res)=>{
      this.trendtv=res.results;
    });
  }
}
