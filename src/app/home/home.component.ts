import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
MoviesService
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  trendMovie:any[]=[];
  trendPeople:any[]=[];
  trendTv:any[]=[];

  imgPrefix:string='https://image.tmdb.org/t/p/w500/';

  constructor(private _MoviesService:MoviesService){}

  ngOnInit(): void {
    this._MoviesService.getMovies("movie").subscribe((res)=>{
      this.trendMovie=res.results.splice(0,10);
    });

    this._MoviesService.getMovies("tv").subscribe((res)=>{
      this.trendTv=res.results.splice(0,10);
    });

    this._MoviesService.getMovies("person").subscribe((res)=>{
      this.trendPeople=res.results.splice(0,10);
    });
  }
  
}
