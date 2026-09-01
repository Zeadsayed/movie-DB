import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.generated';

@Injectable()
export class TmdbInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith('https://api.themoviedb.org/3'))
      return next.handle(request);

    return next.handle(
      request.clone({
        setParams: {
          api_key: environment.tmdbApiKey,
          language: request.params.get('language') || 'en-US',
        },
      }),
    );
  }
}
