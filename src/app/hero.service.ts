import { Injectable } from '@angular/core';

import { Observable} from 'rxjs';

import { Hero } from './hero';
import { docData, doc, deleteDoc, Firestore, collectionData, collection, addDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class HeroService {

  // URL d'accès aux documents sur Firebase
  private static url = 'heroes';
  constructor(private firestore: Firestore) {
  }

  getHeroes(): Observable<Hero[]> {
    // get a reference to the hero collection
    const heroCollection = collection(this.firestore, HeroService.url);
    ///////////
    // Solution 1 : Transformation en une liste d'objets "prototype" de type Hero
    // get documents (data) from the collection using collectionData
    return collectionData(heroCollection, { idField: 'id' }) as Observable<Hero[]>;
  }

  getHero(id: string): Observable<Hero> {
    // Récupération du DocumentReference
    const heroDocument = doc(this.firestore, HeroService.url + "/" + id);
    ///////////
    // Solution 1 : Transformation en un objet "prototype" de type Hero
    // get documents (data) from the collection using collectionData
    return docData(heroDocument, { idField: 'id' }) as Observable<Hero>;
  }

  deleteHero(id: string): Promise<void> {
    // Récupération du DocumentReference
    const heroDocument = doc(this.firestore, HeroService.url + "/" + id);
    //
    return deleteDoc(heroDocument);
  }

  addHero(hero: Hero): void {
    // get a reference to the hero collection
    const heroCollection = collection(this.firestore, HeroService.url);
    //
    addDoc(heroCollection, hero);
    }
    
  updateHero(hero: Hero): void {
    // Récupération du DocumentReference
    const heroDocument = doc(this.firestore, HeroService.url + "/" + hero.id);
    // Update du document à partir du JSON et du documentReference
    let newHeroJSON = {name: hero.name, attack: hero.attack, dodge: hero.dodge, damage: hero.damage, hp: hero.hp, points: hero.points, weapon: hero.weapon};
    updateDoc(heroDocument, newHeroJSON);
  }

    
}