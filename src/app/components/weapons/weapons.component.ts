
import { Component, OnInit } from '@angular/core';
import { Weapon } from '../../data/weapon';

import { WeaponService } from '../../service/weapon.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[] = [];
  selectedFilter: string = 'defaultSort';
  searchWeapon: string = "";

  constructor(private weaponService: WeaponService) { }

  ngOnInit(): void {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
    .subscribe(weapons => this.weapons = weapons);
  }

  addWeapon(): void {
    const weapon = { name: "New Weapon", attack: 0, dodge: 0, damage: 0, hp: 0, points: 0} as unknown as Weapon;
    this.weaponService.addWeapon(weapon);
  }

  searchWeapons(): void {
    if (this.searchWeapon) {
      this.weapons = this.weapons.filter(hero => hero.name.toLowerCase().includes(this.searchWeapon.toLowerCase()));
    } else {
      this.getWeapons();
    }
  }
}