import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PeopleComponent } from './people/people.component';
import { RegisterComponent } from './register/register.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { TvDetailsComponent } from './tv-details/tv-details.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home', canActivate:[AuthGuard],component:HomeComponent},
  {path:'about',canActivate:[AuthGuard],component:AboutComponent},
  {path:'movies',canActivate:[AuthGuard],component:MoviesComponent},
  {path:'tvShows',canActivate:[AuthGuard],component:TvShowsComponent},
  {path:'people',canActivate:[AuthGuard],component:PeopleComponent},
  {path:'movieDetails/:id',canActivate:[AuthGuard],component:MovieDetailsComponent},
  {path:'tvDetails/:id',canActivate:[AuthGuard],component:TvDetailsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
