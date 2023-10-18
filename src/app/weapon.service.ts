import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { docData, doc, deleteDoc, Firestore, collectionData, collection, addDoc, updateDoc } from '@angular/fire/firestore';
import { Weapon } from './weapon';

@Injectable({ providedIn: 'root' })
export class WeaponService {

  // URL d'accès aux documents sur Firebase
  private static url = 'weapons';
  constructor(private firestore: Firestore) {
  }

  getWeapons(): Observable<Weapon[]> {
    // get a reference to the hero collection
    const heroCollection = collection(this.firestore, WeaponService.url);
    ///////////
    // Solution 1 : Transformation en une liste d'objets "prototype" de type Hero
    // get documents (data) from the collection using collectionData
    return collectionData(heroCollection, { idField: 'id' }) as Observable<Weapon[]>;
  }

  getWeapon(id: string): Observable<Weapon> {
    // Récupération du DocumentReference
    const heroDocument = doc(this.firestore, WeaponService.url + "/" + id);
    ///////////
    // Solution 1 : Transformation en un objet "prototype" de type Hero
    // get documents (data) from the collection using collectionData
    return docData(heroDocument, { idField: 'id' }) as Observable<Weapon>;
  }

  deleteWeapon(id: string): Promise<void> {
    // Récupération du DocumentReference
    const heroDocument = doc(this.firestore, WeaponService.url + "/" + id);
    //
    return deleteDoc(heroDocument);
  }

  addWeapon(hero: Weapon): void {
    // get a reference to the hero collection
    const heroCollection = collection(this.firestore, WeaponService.url);
    //
    addDoc(heroCollection, hero);
    }
    
  updateWeapon(hero: Weapon): void {
    // Récupération du DocumentReference
    const heroDocument = doc(this.firestore, WeaponService.url + "/" + hero.id);
    // Update du document à partir du JSON et du documentReference
    let newHeroJSON = {name: hero.name, attack: hero.attack, dodge: hero.dodge, damage: hero.damage, hp: hero.hp, points: 36, weapon: "0"};
    updateDoc(heroDocument, newHeroJSON);
  }
}