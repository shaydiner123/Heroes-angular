import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero } from '../hero.model';
import { HeroesManagerService } from './heroes-manager.service';

@Injectable({ providedIn: 'root' })
export class HeroesResolverService implements Resolve<Hero[]> {
  constructor(private heroesManagerService: HeroesManagerService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Hero[]> {
    return this.heroesManagerService.getHeroes();
  }
}
