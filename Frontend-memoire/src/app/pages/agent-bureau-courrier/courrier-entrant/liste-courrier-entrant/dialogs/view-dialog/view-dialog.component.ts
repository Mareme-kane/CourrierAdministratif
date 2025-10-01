import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.sass']
})
export class ViewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  getStatusClass(status: string): string {
    switch (status) {
      case 'EN_ATTENTE': return 'badge-warning';
      case 'EN_COURS': return 'badge-info';
      case 'TRAITE': return 'badge-success';
      case 'ARCHIVE': return 'badge-secondary';
      case 'REJETE': return 'badge-danger';
      default: return 'badge-primary';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'EN_ATTENTE': return 'En attente';
      case 'EN_COURS': return 'En cours';
      case 'TRAITE': return 'Traité';
      case 'ARCHIVE': return 'Archivé';
      case 'REJETE': return 'Rejeté';
      default: return status;
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'EN_ATTENTE': return 'schedule';
      case 'EN_COURS': return 'hourglass_empty';
      case 'TRAITE': return 'check_circle';
      case 'ARCHIVE': return 'archive';
      case 'REJETE': return 'cancel';
      default: return 'help';
    }
  }
}