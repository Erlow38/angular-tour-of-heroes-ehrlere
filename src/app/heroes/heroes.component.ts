import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];  
  selectedFilter: string = 'defaultSort';
  searchHero: string = "";

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  addHero(): void {
    const hero = { name: "New Hero", attack: 1, dodge: 1, damage: 1, hp: 1, points: 36, weapon: "0" } as unknown as Hero;
    this.heroService.addHero(hero);
  }

  searchHeroes(): void {
    if (this.searchHero) {
      this.heroes = this.heroes.filter(hero => hero.name.toLowerCase().includes(this.searchHero.toLowerCase()));
    } else {
      this.getHeroes();
    }
  }

}