import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Weapon } from './weapon';
import { WEAPONS } from './mock-weapons';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class WeaponService {

  constructor(private messageService: MessageService) { }

  getWeapons(): Observable<Weapon[]> {
    const weapons = of(WEAPONS);
    this.messageService.add('WeaponService: fetched weapons');
    return weapons;
  }

  getWeapon(id: number): Observable<Weapon> {
    const weapon = WEAPONS.find(h => h.id === id)!;
    this.messageService.add(`WeaponsService: fetched weapon id=${id}`);
    return of(weapon);
  }
}