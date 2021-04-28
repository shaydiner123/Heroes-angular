import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { take } from 'rxjs/operators';
import { Hero } from './hero.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    //get the data from the resolver-service
    this.route.data.pipe(take(1)).subscribe((data: Data) => {
      this.heroes = data['heroesList'];
      console.log(this.heroes);
    });
  }
}
