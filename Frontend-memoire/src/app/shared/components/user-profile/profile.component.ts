import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SharedModule} from "../../shared.module";
import {ComponentsModule} from "../components.module";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    SharedModule,
    ComponentsModule,
  ],
  standalone: true
})
export class ProfileComponent implements OnInit {

  breadscrums = [
    {
      title: 'E-Municipalité',
      items: ['Tableau de bord'],
      active: 'Accueil'
    }
  ];

  profileForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['Jean', Validators.required],
      lastName: ['Dupont', Validators.required],
      email: ['jean.dupont@email.com', [Validators.required, Validators.email]],
      phone: ['0123456789', Validators.required],
      address: ['45 Rue de la République', Validators.required],
      city: ['Lyon', Validators.required],
      postalCode: ['69001', Validators.required],
      birthDate: ['1985-05-15', Validators.required]
    });
  }

  ngOnInit(): void {
    this.profileForm.disable(); // Désactiver le formulaire par défaut
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      console.log('Profil sauvegardé:', this.profileForm.value);
      this.toggleEditMode();
      // Ici, vous ajouteriez la logique pour sauvegarder les données du profil
    }
  }

  cancelEdit(): void {
    // Réinitialiser le formulaire aux valeurs précédentes
    this.profileForm.reset({
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@email.com',
      phone: '0123456789',
      address: '45 Rue de la République',
      city: 'Lyon',
      postalCode: '69001',
      birthDate: '1985-05-15'
    });
    this.toggleEditMode();
  }
}
