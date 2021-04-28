import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponseData } from '../../shared/Models/ApiResponseData';
import { HttpErrorService } from '../../shared/Services/httpError.service';
import { Hero } from '../hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesManagerService {
  constructor(
    private http: HttpClient,
    private httpErrorService: HttpErrorService
  ) {}

  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<ApiResponseData<Hero[]>>(`${environment.apiUrl}/api/heroes`)
      .pipe(
        // sort by power
        tap((response) => {
          let heroes = response.content;
          heroes.sort((a, b) => {
            return a.currentPower - b.currentPower;
          });
        }),
        map((response) => {
          return response.content;
        }),
        catchError((error: HttpErrorResponse) => {
          this.httpErrorService.handleHttpError(error);
          console.log('error occured: ', error);
          return of([]);
        })
      );
  }

  updateHeroPower(hero: Hero): Observable<any> {
    return this.http
      .patch<ApiResponseData<Hero>>(
        `${environment.apiUrl}/api/heroes/trainHero`,
        hero
      )
      .pipe(
        map((response) => {
          return response.content;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            return throwError('');
          }
          this.httpErrorService.handleHttpError(error);
        })
      );
  }
}
