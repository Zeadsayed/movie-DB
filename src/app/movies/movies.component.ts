import { Component , OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  trendMovie:any[]=[];
  imgPrefix:string='https://image.tmdb.org/t/p/w500/';
  constructor(private _MoviesService:MoviesService){}

  ngOnInit(): void {
    this._MoviesService.getMovies("movie").subscribe((res)=>{
      this.trendMovie=res.results;
    });
  }
}
