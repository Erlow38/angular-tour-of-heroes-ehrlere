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
  totalPoints: number = 40;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.calculateTotalPoints();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  pointAttribution(attribute: string): void {
  if (this.hero) {
    // Calculez le total des points en fonction des attributs
    this.calculateTotalPoints();

    // Si le total est négatif, affichez une alerte
    if (this.totalPoints < 0) {
      alert('You have no more points to attribute!');

      switch (attribute) {
        case 'attack':
          if (this.hero.attack > 0) {
            this.hero.attack--;
            this.calculateTotalPoints(); // Recalculez le total des points
          }
          break;
        case 'dodge':
          if (this.hero.dodge > 0) {
            this.hero.dodge--;
            this.calculateTotalPoints(); // Recalculez le total des points
          }
          break;
        case 'damage':
          if (this.hero.damage > 0) {
            this.hero.damage--;
            this.calculateTotalPoints(); // Recalculez le total des points
          }
          break;
        case 'hp':
          if (this.hero.hp > 0) {
            this.hero.hp--;
            this.calculateTotalPoints(); // Recalculez le total des points
          }
          break;
        default:
          break;
      }
    }
  }
}


  private calculateTotalPoints(): void {
    if (this.hero) {
      this.totalPoints = this.hero.points - (this.hero.attack || 0) - (this.hero.dodge || 0) - (this.hero.damage || 0) - (this.hero.hp || 0);
    }
  }
}