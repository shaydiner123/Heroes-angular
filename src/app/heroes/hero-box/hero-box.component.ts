import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Hero } from '../hero.model';
import { HeroesManagerService } from '../Services/heroes-manager.service';

@Component({
  selector: 'app-hero-box',
  templateUrl: './hero-box.component.html',
  styleUrls: ['./hero-box.component.scss'],
})
export class HeroBoxComponent implements OnInit {
  @Input() hero: Hero;
  isHeroAlreadyTrainedFiveTimesToday: boolean;

  constructor(private heroesManagerService: HeroesManagerService) {}

  ngOnInit(): void {}

  trainHero(): void {
    this.heroesManagerService
      .updateHeroPower(this.hero)
      .pipe(take(1))
      .subscribe(
        (hero: Hero) => {
          this.isHeroAlreadyTrainedFiveTimesToday = false;
          this.hero = hero;
        },
        () => {
          this.isHeroAlreadyTrainedFiveTimesToday = true;
        }
      );
  }
}
