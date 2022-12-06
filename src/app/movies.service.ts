import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient:HttpClient) { }

  getMovies(type:string):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=0a46f789c05ab1c8460d239b811d296a`)
  }
  
  getMoviesDetails(id:string):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=0a46f789c05ab1c8460d239b811d296a&language=en-US`)
  }
}
