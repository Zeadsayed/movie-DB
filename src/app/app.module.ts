import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './features/login/login.component';
import { MoviesComponent } from './features/movies/movies.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { NotfoundComponent } from './features/not-found/notfound.component';
import { TvShowsComponent } from './features/tv-shows/tv-shows.component';
import { PeopleComponent } from './features/people/people.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MovieDetailsComponent } from './features/movie-details/movie-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HeaderComponent } from './layout/header/header.component';
import { TvDetailsComponent } from './features/tv-details/tv-details.component';
import { WatchlistComponent } from './features/watchlist/watchlist.component';
import { DiscoverComponent } from './features/discover/discover.component';
import { PersonDetailsComponent } from './features/person-details/person-details.component';
import { TmdbInterceptor } from './core/interceptors/tmdb.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    LoginComponent,
    MoviesComponent,
    NavbarComponent,
    NotfoundComponent,
    TvShowsComponent,
    PeopleComponent,
    MovieDetailsComponent,
    HeaderComponent,
    WatchlistComponent,
    TvDetailsComponent,
    DiscoverComponent,
    PersonDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TmdbInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
