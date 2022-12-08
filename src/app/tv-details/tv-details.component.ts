import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tvsService } from '../tvs.service';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css']
})
export class TvDetailsComponent implements OnInit {

  id:string='';

  tvDetails:any;
  
  imgPrefix:string='https://image.tmdb.org/t/p/w500/';

  constructor(private _ActivatedRoute:ActivatedRoute, private _tvsService:tvsService ){}

  ngOnInit(): void {
    this.id=this._ActivatedRoute.snapshot.params['id'];  

    this._tvsService.getTvDetails(this.id).subscribe((res)=>{
      this.tvDetails=res;
    }) 
  }
}
