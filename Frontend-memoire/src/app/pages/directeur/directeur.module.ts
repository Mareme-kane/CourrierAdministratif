import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CourrierEntrantComponent } from './courrier-entrant/courrier-entrant.component';
import { CourrierSortantComponent } from './courrier-sortant/courrier-sortant.component';
import { CourrierTraiteComponent } from './courrier-traite/courrier-traite.component';
import { CourrierArchiveComponent } from './courrier-archive/courrier-archive.component';
import { ComponentsModule } from '../../shared/components/components.module';
import { SharedModule } from '../../shared/shared.module';
import { DirecteurRoutingModule } from "./directeur-routing.module";

// Import advance-table components for courrier-entrant
import { AdvanceTableEntrantComponent } from './courrier-entrant/liste-courrier-entrant/liste-courrier-entrant.component';
import { FormDialogEntrantComponent } from './courrier-entrant/liste-courrier-entrant/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogEntrantComponent } from './courrier-entrant/liste-courrier-entrant/dialogs/delete/delete.component';
import { AdvanceTableEntrantService } from './courrier-entrant/liste-courrier-entrant/liste-courrier-entrant.service';

// Import advance-table components for courrier-sortant
import { AdvanceTableSortantComponent } from './courrier-sortant/advance-table/advance-table.component';
import { FormDialogSortantComponent } from './courrier-sortant/advance-table/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogSortantComponent } from './courrier-sortant/advance-table/dialogs/delete/delete.component';
import { AdvanceTableSortantService } from './courrier-sortant/advance-table/advance-table.service';

// Import advance-table components for courrier-traite
import { AdvanceTableTraiteComponent } from './courrier-traite/advance-table/advance-table.component';
import { FormDialogTraiteComponent } from './courrier-traite/advance-table/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogTraiteComponent } from './courrier-traite/advance-table/dialogs/delete/delete.component';
import { AdvanceTableTraiteService } from './courrier-traite/advance-table/advance-table.service';

// Import advance-table components for courrier-archive
import { AdvanceTableArchiveComponent } from './courrier-archive/advance-table/advance-table.component';
import { FormDialogArchiveComponent } from './courrier-archive/advance-table/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogArchiveComponent } from './courrier-archive/advance-table/dialogs/delete/delete.component';
import { AdvanceTableArchiveService } from './courrier-archive/advance-table/advance-table.service';

import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { CourrierImputeComponent } from './courrier-impute/courrier-impute.component';
import { AdvanceTableImputeComponent } from './courrier-impute/advance-table/advance-table.component';

// Angular Material imports
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    CourrierTraiteComponent,
    CourrierSortantComponent,
    CourrierEntrantComponent,
    CourrierArchiveComponent,
    CourrierImputeComponent,
    TableauDeBordComponent,
    AdvanceTableEntrantComponent,
    FormDialogEntrantComponent,
    DeleteDialogEntrantComponent,
    AdvanceTableSortantComponent,
    FormDialogSortantComponent,
    DeleteDialogSortantComponent,
    AdvanceTableTraiteComponent,
    FormDialogTraiteComponent,
    DeleteDialogTraiteComponent,
    AdvanceTableArchiveComponent,
    FormDialogArchiveComponent,
    DeleteDialogArchiveComponent,
    AdvanceTableImputeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirecteurRoutingModule,
    ComponentsModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatTableExporterModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    NgChartsModule,
    NgApexchartsModule
  ],
  providers: [
    AdvanceTableEntrantService, 
    AdvanceTableSortantService, 
    AdvanceTableTraiteService, 
    AdvanceTableArchiveService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DirecteurModule {}
