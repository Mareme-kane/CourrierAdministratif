import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AdvanceTableEntrantService } from '../../liste-courrier-entrant.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteDialogEntrantComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogEntrantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: AdvanceTableEntrantService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    // Le directeur ne peut pas supprimer les courriers
    console.log('Action non autorisée pour le directeur');
  }
}
