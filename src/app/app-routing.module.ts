import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AboutComponent } from './features/about/about.component';
import { DiscoverComponent } from './features/discover/discover.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { MovieDetailsComponent } from './features/movie-details/movie-details.component';
import { MoviesComponent } from './features/movies/movies.component';
import { NotfoundComponent } from './features/not-found/notfound.component';
import { PeopleComponent } from './features/people/people.component';
import { PersonDetailsComponent } from './features/person-details/person-details.component';
import { TvDetailsComponent } from './features/tv-details/tv-details.component';
import { TvShowsComponent } from './features/tv-shows/tv-shows.component';
import { WatchlistComponent } from './features/watchlist/watchlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'about', canActivate: [AuthGuard], component: AboutComponent },
  { path: 'movies', canActivate: [AuthGuard], component: MoviesComponent },
  { path: 'tvShows', canActivate: [AuthGuard], component: TvShowsComponent },
  { path: 'people', canActivate: [AuthGuard], component: PeopleComponent },
  { path: 'discover', canActivate: [AuthGuard], component: DiscoverComponent },
  {
    path: 'person/:id',
    canActivate: [AuthGuard],
    component: PersonDetailsComponent,
  },
  {
    path: 'movieDetails/:id',
    canActivate: [AuthGuard],
    component: MovieDetailsComponent,
  },
  {
    path: 'tvDetails/:id',
    canActivate: [AuthGuard],
    component: TvDetailsComponent,
  },
  {
    path: 'watchlist',
    canActivate: [AuthGuard],
    component: WatchlistComponent,
  },
  { path: 'cart', redirectTo: 'watchlist', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
