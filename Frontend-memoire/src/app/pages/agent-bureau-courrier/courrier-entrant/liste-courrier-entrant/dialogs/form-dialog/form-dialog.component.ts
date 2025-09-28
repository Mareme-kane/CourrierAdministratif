import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AdvanceTableEntrantService } from '../../liste-courrier-entrant.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { AdvanceTable } from '../../liste-courrier-entrant.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormDialogEntrantComponent {
  action: string;
  dialogTitle: string;
  advanceTableForm: UntypedFormGroup;
  advanceTable: AdvanceTable;
  constructor(
    public dialogRef: MatDialogRef<FormDialogEntrantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: AdvanceTableEntrantService,
    private fb: UntypedFormBuilder
  ) {
    // Initialisation des propriétés
    this.selectedFiles = [];
    
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Modifier le courrier - ' + (data.advanceTable.expediteur || 'Sans nom');
      this.advanceTable = data.advanceTable;
    } else {
      this.dialogTitle = 'Nouveau Courrier';
      this.advanceTable = new AdvanceTable({});
    }
    this.advanceTableForm = this.createContactForm();
    
    console.log('Dialog initialized with action:', this.action);
    console.log('Initial form value:', this.advanceTableForm.value);
  }
  formControl = new UntypedFormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  selectedFiles: File[] = [];
  isDragOver: boolean = false;

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  createContactForm(): UntypedFormGroup {
    const form = this.fb.group({
      id: [this.advanceTable.id],
      courrier_id: [this.advanceTable.courrier_id],
      expediteur: [this.advanceTable.expediteur, [Validators.required]],
      dateArrivee: [this.advanceTable.dateArrivee || new Date().toISOString().split('T')[0], [Validators.required]],
      reference: [this.advanceTable.courrier?.reference || this.generateReference()],
      objet: [this.advanceTable.courrier?.objet, [Validators.required]],
      niveauConfidentiel: [this.advanceTable.courrier?.niveauConfidentiel || 'ORDINAIRE', [Validators.required]],
      statutCourrier: [this.advanceTable.courrier?.statutCourrier || 'EN_COURS'],
      fichier_joint: [this.advanceTable.courrier?.fichier_joint || ''],
      nbreFichiers: [0],

    });
    
    console.log('Form created with values:', form.value);
    return form;
  }

  private generateReference(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `REF-${year}${month}${day}-${random}`;
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onFileSelected(event: any): void {
    console.log('File selection event:', event);
    const files = Array.from(event.target.files) as File[];
    console.log('Selected files:', files);
    
    if (files && files.length > 0) {
      // Filtrer les fichiers selon les types acceptés
      const acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
      const validFiles = files.filter(file => {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();
        return acceptedTypes.includes(extension);
      });
      
      if (validFiles.length > 0) {
        this.selectedFiles = [...this.selectedFiles, ...validFiles];
        this.updateFileInfo();
      } else {
        console.warn('Aucun fichier valide sélectionné');
      }
    }
    
    // Reset input value pour permettre la sélection du même fichier
    event.target.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
    console.log('Drag over');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    console.log('Drag leave');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    console.log('Drop event:', event);
    
    const files = Array.from(event.dataTransfer?.files || []) as File[];
    console.log('Dropped files:', files);
    
    if (files && files.length > 0) {
      // Filtrer les fichiers selon les types acceptés
      const acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
      const validFiles = files.filter(file => {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();
        return acceptedTypes.includes(extension);
      });
      
      if (validFiles.length > 0) {
        this.selectedFiles = [...this.selectedFiles, ...validFiles];
        this.updateFileInfo();
      } else {
        console.warn('Aucun fichier valide détecté');
      }
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.updateFileInfo();
  }

  private updateFileInfo(): void {
    const fileNames = this.selectedFiles.map(f => f.name).join(', ');
    
    this.advanceTableForm.patchValue({
      fichier_joint: fileNames,
      nbreFichiers: this.selectedFiles.length.toString()
    });
    
    console.log('Form updated with files:', this.advanceTableForm.value);
  }

  public confirmAdd(): void {
    console.log('Form submission started');
    console.log('Form valid:', this.advanceTableForm.valid);
    
    if (!this.advanceTableForm.valid) {
      console.log('Form is invalid, marking all fields as touched');
      this.advanceTableForm.markAllAsTouched();
      return;
    }
    
    const formData = this.advanceTableForm.getRawValue();
    console.log('Form data:', formData);
    
    const courrierData = new AdvanceTable({
      id: formData.id || 0,
      courrier_id: formData.courrier_id || 0,
      expediteur: formData.expediteur,
      dateArrivee: formData.dateArrivee,
      created_at: this.advanceTable.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      courrier: {
        id: this.advanceTable.courrier?.id || 0,
        reference: formData.reference,
        objet: formData.objet,
        niveauConfidentiel: formData.niveauConfidentiel,
        statutCourrier: formData.statutCourrier || 'EN_COURS',
        fichier_joint: formData.fichier_joint || '',
        created_at: this.advanceTable.courrier?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    });
    
    console.log('Courrier data to save:', courrierData);
    
    if (this.action === 'edit') {
      console.log('Updating courrier');
      this.advanceTableService.updateAdvanceTable(courrierData);
    } else {
      console.log('Adding new courrier');
      this.advanceTableService.addAdvanceTable(courrierData);
    }
  }
}
