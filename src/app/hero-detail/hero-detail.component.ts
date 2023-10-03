import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  pointAttribution(): void {
    if (this.hero) { // Vérifiez si hero est défini
      const totalPointsUsed = (this.hero.attack || 0) + (this.hero.dodge || 0) + (this.hero.damage || 0) + (this.hero.hp || 0);
      this.hero.points = 40 - totalPointsUsed;
      if (this.hero.points < 0) {
        //  il n'est plus possible d'ajouter des points
        this.hero.points = 0;
      }
    }
  }
  


}