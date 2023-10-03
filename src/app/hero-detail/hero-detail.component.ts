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
  
      // Vérifiez si le total des points disponibles est supérieur à zéro
      if (this.totalPoints > 0) {
        switch (attribute) {
          case 'attack':
            this.hero.attack++;
            this.totalPoints--;
            break;
          case 'dodge':
            this.hero.dodge++;
            this.totalPoints--;
            break;
          case 'damage':
            this.hero.damage++;
            this.totalPoints--;
            break;
          case 'hp':
            this.hero.hp++;
            this.totalPoints--;
            break;
          default:
            break;
        }
      } else {
        alert('Vous n\'avez plus de points à attribuer pour cette compétence.');
        /*switch (attribute) {
          case 'attack':
            this.hero.attack--;
            this.totalPoints++;
            break;
          case 'dodge':
            this.hero.dodge--;
            this.totalPoints++;
            break;
          case 'damage':
            this.hero.damage--;
            this.totalPoints++;
            break;
          case 'hp':
            this.hero.hp--;
            this.totalPoints++;
            break;
          default:
            break;
        }*/
      }
    }
  }
  
  

  private calculateTotalPoints(): void {
    if (this.hero) {
      this.totalPoints = this.hero.points - (this.hero.attack || 0) - (this.hero.dodge || 0) - (this.hero.damage || 0) - (this.hero.hp || 0);
    }
  }
}