import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { tvsService } from '../tvs.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent {

  trendtv:any[]=[];
  imgPrefix:string='https://image.tmdb.org/t/p/w500/';
  error :string='';

  constructor(private _MoviesService:MoviesService, private _tvsService:tvsService){
    this.getTvsPage(1); // initial

  }

  getTvsPage(page:number){

    this._tvsService.getTvsPage(page).subscribe((res)=>{ //Next
 
       console.log(res.results)
 
       this.trendtv = res.results
 
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
    this._tvsService.getTv().subscribe((res)=>{
      this.trendtv=res.results.splice(0,12);
    });
  }
}
