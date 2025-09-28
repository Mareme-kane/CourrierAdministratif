import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableauDeBordComponent } from "./tableau-de-bord/tableau-de-bord.component";
import { UtilisateursComponent } from "./utilisateurs/utilisateurs.component";
import { RolesComponent } from "./roles/roles.component";
import { RoleGuard } from '../../core/guard/role.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'tableau-de-bord', pathMatch: 'full' },
      { path: 'tableau-de-bord', component: TableauDeBordComponent },
      { path: 'utilisateurs', component: UtilisateursComponent },
      { path: 'roles', component: RolesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrateurRoutingModule {}
