import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class tvsService {

  constructor(private _HttpClient:HttpClient) { }

  getTv():Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/tv/popular?api_key=0a46f789c05ab1c8460d239b811d296a&language=en-US`)
  }

  getTvsPage(page:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/tv/popular?api_key=0a46f789c05ab1c8460d239b811d296a&language=en-US&page=${page}`);
  }
  
  getTvDetails(id:string):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/tv/${id}?api_key=0a46f789c05ab1c8460d239b811d296a`)
  }
  
}
