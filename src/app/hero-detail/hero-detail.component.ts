import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importez Validators
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Weapon } from '../weapon';
import { WeaponService } from '../weapon.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  hero: Hero | undefined;
  weapons: Weapon[] = [];
  heroForm: FormGroup;
  remainingPoints: number = 36;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private fb: FormBuilder,
    private weaponService: WeaponService
  ) {
    this.heroForm = this.fb.group({
      name: ['', Validators.required], 
      attack: ['1', [Validators.required, Validators.min(1), Validators.max(this.remainingPoints)]], 
      dodge: ['1', [Validators.required, Validators.min(1), Validators.max(this.remainingPoints)]], 
      damage: ['1', [Validators.required, Validators.min(1), Validators.max(this.remainingPoints)]],
      hp: ['1', [Validators.required, Validators.min(1), Validators.max(this.remainingPoints)]],
      weapon : ['0', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getHero();
    this.getWeapons();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id')! : "0";
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.heroForm.patchValue(hero); 
      });
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
    .subscribe(weapons => this.weapons = weapons);
  }

  pointAttribut(attribute: string): void {
    if (this.hero) {
      const heroFormValue = this.heroForm.value;
      // Calculez le total des points en fonction des attributs
      this.remainingPoints = 40 - heroFormValue.attack - heroFormValue.dodge - heroFormValue.damage - heroFormValue.hp;

      const attackAttribuable = 40 - heroFormValue.dodge - heroFormValue.damage - heroFormValue.hp;
      const dodgeAttribuable = 40 - heroFormValue.attack - heroFormValue.damage - heroFormValue.hp;
      const damageAttribuable = 40 - heroFormValue.attack - heroFormValue.dodge - heroFormValue.hp;
      const hpAttribuable = 40 - heroFormValue.attack - heroFormValue.dodge - heroFormValue.damage;

      // Mettez à jour les validateurs max en fonction de remainingPoints
      this.heroForm.controls['attack'].setValidators([Validators.min(1), Validators.max(attackAttribuable)]);
      this.heroForm.controls['dodge'].setValidators([Validators.min(1), Validators.max(dodgeAttribuable)]);
      this.heroForm.controls['damage'].setValidators([Validators.min(1), Validators.max(damageAttribuable)]);
      this.heroForm.controls['hp'].setValidators([Validators.min(1), Validators.max(hpAttribuable)]);

      // Pour appliquer les nouveaux validateurs, appelez updateValueAndValidity
      this.heroForm.controls['attack'].updateValueAndValidity();
      this.heroForm.controls['dodge'].updateValueAndValidity();
      this.heroForm.controls['damage'].updateValueAndValidity();
      this.heroForm.controls['hp'].updateValueAndValidity();

    }
  }

  savePoints() {
    //récupérer les valeurs du formulaire
    const heroFormValue = this.heroForm.value;
    //mettre à jour le héro
    if (this.hero) {
      this.hero.name = heroFormValue.name;
      this.hero.attack = heroFormValue.attack;
      this.hero.dodge = heroFormValue.dodge;
      this.hero.damage = heroFormValue.damage;
      this.hero.hp = heroFormValue.hp;
      this.hero.weapon = heroFormValue.weapon;
      this.hero.points = 40 - this.hero.attack - this.hero.dodge - this.hero.damage - this.hero.hp;
      this.heroService.updateHero(this.hero);
      alert("Hero updated");
    }
  }

  deleteHero() {
    if (this.hero) {
      this.heroService.deleteHero(this.hero.id.toString());
      alert("Hero deleted");
      this.goBack();
    }
  }


  resetPoint() {
    if (this.hero) {
      this.remainingPoints = 36;
      
      // Réinitialisez les valeurs dans le formulaire en utilisant patchValue
      this.heroForm.patchValue({
        attack: 1,
        dodge: 1,
        damage: 1,
        hp: 1
      });
    }
  }

  goBack(): void {
    if (confirm("Are you sure to leave this page ? All unsaved changes will be lost.")) {
      this.location.back();
    }
  }
}
