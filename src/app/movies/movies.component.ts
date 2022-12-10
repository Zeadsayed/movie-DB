import { Component , OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  
  trendMovie:any[]=[];
  imgPrefix:string='https://image.tmdb.org/t/p/w500/';
  error :string='';


  constructor(private _MoviesService:MoviesService){
    this.getMoviesPage(1); // initial
  }

  
  getMoviesPage(page:number){

    this._MoviesService.getMoviesPage(page).subscribe((res)=>{ //Next
 
       console.log(res.results)
 
       this.trendMovie = res.results
 
     },
 
     (err)=>{ //Error
 
       console.log(err.message);
 
       this.error=err.message;
 
       let isComplete=false;
 
     },
 
     ()=>{ //complete
 
       console.log("complete");
 
       let message="ok";
 
       let isComplete=true;
 
     });
   }

  ngOnInit(): void {
    this._MoviesService.getMovie().subscribe((res)=>{
      this.trendMovie=res.results.splice(0,12);
    });
  }
}
