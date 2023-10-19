import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Weapon } from '../weapon';
import { WeaponService } from '../weapon.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Location } from '@angular/common';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent {
  weapon: Weapon | undefined;
  weaponForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.weaponForm = this.fb.group({
      name: ['', Validators.required], 
      attack: ['0', [Validators.required]], 
      dodge: ['0', [Validators.required]],  
      damage: ['0', [Validators.required]], 
      hp: ['0', [Validators.required]]
    });
  }




  ngOnInit(): void {
    this.getWeapon();
  }

  getWeapon(): void {
    const id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id')! : "0";
    this.weaponService.getWeapon(id)
      .subscribe(weapon => {
        this.weapon = weapon;
        this.weaponForm.patchValue(weapon); 
      });
  }

  pointAttribut(attribute: string): void {
    if (this.weapon) {
    }
  }

  deleteWeapon() {
    if (this.weapon) {
      this.weaponService.deleteWeapon(this.weapon.id.toString());
      alert("Weapon deleted");
      this.goBack();
    }
  }

  savePoints() {
    //récupérer les valeurs du formulaire
    const weaponFormValue = this.weaponForm.value;
    //mettre à jour le héro
    if (this.weapon) {
      this.weapon.name = weaponFormValue.name;
      this.weapon.attack = weaponFormValue.attack;
      this.weapon.dodge = weaponFormValue.dodge;
      this.weapon.damage = weaponFormValue.damage;
      this.weapon.hp = weaponFormValue.hp;      
      this.weaponService.updateWeapon(this.weapon);
      alert("Weapon updated");
    }
  }

  resetPoint() {
    if (this.weapon) {
      
      // Réinitialisez les valeurs dans le formulaire en utilisant patchValue
      this.weaponForm.patchValue({
        attack: 0,
        dodge: 0,
        damage: 0,
        hp: 0
      });
    }
  }
  
  

  goBack(): void {
    if (confirm("Are you sure to leave this page ? All unsaved changes will be lost.")) {
      this.location.back();
    }
  }

}

