import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourrierEntrantComponent} from "./courrier-entrant/courrier-entrant.component";
import {CourrierSortantComponent} from "./courrier-sortant/courrier-sortant.component";
import {CourrierTraiteComponent} from "./courrier-traite/courrier-traite.component";
import {CourrierArchiveComponent} from "./courrier-archive/courrier-archive.component";
import {CourrierImputeComponent} from "./courrier-impute/courrier-impute.component";
import {TableauDeBordComponent} from "./tableau-de-bord/tableau-de-bord.component";

const routes: Routes = [
  { path: '', redirectTo: 'tableau-de-bord', pathMatch: 'full' },
  { path: 'tableau-de-bord', component: TableauDeBordComponent },
  { path: 'courrier-entrant', component: CourrierEntrantComponent },
  { path: 'courrier-sortant', component: CourrierSortantComponent },
  { path: 'courrier-traite', component: CourrierTraiteComponent },
  { path: 'courrier-archive', component: CourrierArchiveComponent },
  { path: 'courrier-impute', component: CourrierImputeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirecteurRoutingModule {}
