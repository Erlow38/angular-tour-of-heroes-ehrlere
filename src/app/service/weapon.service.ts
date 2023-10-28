import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { docData, doc, deleteDoc, Firestore, collectionData, collection, addDoc, updateDoc } from '@angular/fire/firestore';
import { Weapon } from '../data/weapon';

@Injectable({ providedIn: 'root' })
export class WeaponService {

  // URL d'accès aux documents sur Firebase
  private static url = 'weapons';
  constructor(private firestore: Firestore) {
  }

  getWeapons(): Observable<Weapon[]> {
    // get a reference to the weapon collection
    const weaponCollection = collection(this.firestore, WeaponService.url);
    ///////////
    // Solution 1 : Transformation en une liste d'objets "prototype" de type Hero
    // get documents (data) from the collection using collectionData
    return collectionData(weaponCollection, { idField: 'id' }) as Observable<Weapon[]>;
  }

  getWeapon(id: string): Observable<Weapon> {
    // Récupération du DocumentReference
    const weaponDocument = doc(this.firestore, WeaponService.url + "/" + id);
    ///////////
    // Solution 1 : Transformation en un objet "prototype" de type Hero
    // get documents (data) from the collection using collectionData
    return docData(weaponDocument, { idField: 'id' }) as Observable<Weapon>;
  }

  deleteWeapon(id: string): Promise<void> {
    // Récupération du DocumentReference
    const weaponDocument = doc(this.firestore, WeaponService.url + "/" + id);
    //
    return deleteDoc(weaponDocument);
  }

  addWeapon(weapon: Weapon): void {
    // get a reference to the weapon collection
    const weaponCollection = collection(this.firestore, WeaponService.url);
    //
    addDoc(weaponCollection, weapon);
    }
    
  updateWeapon(weapon: Weapon): void {
    // Récupération du DocumentReference
    const weaponDocument = doc(this.firestore, WeaponService.url + "/" + weapon.id);
    // Update du document à partir du JSON et du documentReference
    let newHeroJSON = {name: weapon.name, attack: weapon.attack, dodge: weapon.dodge, damage: weapon.damage, hp: weapon.hp, points: 36, weapon: "0"};
    updateDoc(weaponDocument, newHeroJSON);
  }
}