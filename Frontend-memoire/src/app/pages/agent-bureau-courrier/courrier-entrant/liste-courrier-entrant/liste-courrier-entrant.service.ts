import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdvanceTable } from './liste-courrier-entrant.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '../../../../shared/UnsubscribeOnDestroyAdapter';

interface CourrierFormData {
  objet?: string;
  niveauConfidentiel?: string;
  fichier_joint?: string;
  nbre_fichiers?: string | number;
}
@Injectable()
export class AdvanceTableEntrantService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'http://127.0.0.1:8000/api/agent-bureau/courrier-entrant';
  isTblLoading = true;
  dataChange: BehaviorSubject<AdvanceTable[]> = new BehaviorSubject<
    AdvanceTable[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AdvanceTable[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }

  /** CRUD METHODS */
  getAllAdvanceTables(): void {
    console.log('Fetching courriers from API:', this.API_URL);
    this.isTblLoading = true;
    
    this.subs.sink = this.httpClient
      .get<any>(this.API_URL, this.getHttpOptions())
      .subscribe(
        (response) => {
          console.log('API response for getAllAdvanceTables:', response);
          this.isTblLoading = false;
          
          if (response && response.success) {
            let courriers = [];
            if (response.data && Array.isArray(response.data)) {
              courriers = response.data.map(item => new AdvanceTable(item));
            } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
              courriers = response.data.data.map(item => new AdvanceTable(item));
            }
            console.log('Processed courriers:', courriers);
            this.dataChange.next(courriers);
          } else {
            console.warn('Unexpected API response format:', response);
            this.dataChange.next([]);
          }
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.error('API error in getAllAdvanceTables:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          this.dataChange.next([]);
        }
      );
  }
  addAdvanceTable(advanceTable: AdvanceTable): void {
    console.log('Sending data to API:', advanceTable);
    
    // Préparer les données pour l'API backend (format plat)
    const apiData = {
      expediteur: advanceTable.expediteur || '',
      dateArrivee: advanceTable.dateArrivee || '',
      objet: advanceTable.courrier?.objet || '',
      niveauConfidentiel: advanceTable.courrier?.niveauConfidentiel || 'ORDINAIRE',
      fichier_joint: advanceTable.courrier?.fichier_joint || '',
      nbre_fichiers: advanceTable.courrier?.nbre_fichiers ? parseInt(advanceTable.courrier.nbre_fichiers.toString()) : undefined
    };
    
    console.log('API payload:', apiData);
    
    console.log('Sending POST request to:', this.API_URL);
    console.log('Request headers:', this.getHttpOptions());
    console.log('Request payload:', JSON.stringify(apiData, null, 2));
    
    this.httpClient.post(this.API_URL, apiData, this.getHttpOptions()).subscribe(
      (response: any) => {
        console.log('API response:', response);
        this.dialogData = advanceTable;
        // Recharger les données après ajout
        this.getAllAdvanceTables();
      },
      (err: HttpErrorResponse) => {
        console.error('API error:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        console.error('Error details:', err.error);
        console.error('Full error object:', JSON.stringify(err, null, 2));
      }
    );
  }
  
  private processFormData(formData: CourrierFormData): any {
    return {
      objet: formData.objet || '',
      niveauConfidentiel: formData.niveauConfidentiel || 'ORDINAIRE',
      fichier_joint: formData.fichier_joint || '',
      nbre_fichiers: formData.nbre_fichiers ? parseInt(formData.nbre_fichiers.toString()) : undefined
    };
  }
  
  updateAdvanceTable(advanceTable: AdvanceTable): void {
    console.log('Updating data via API:', advanceTable);
    
    const apiData = {
      expediteur: advanceTable.expediteur,
      dateArrivee: advanceTable.dateArrivee,
      objet: advanceTable.courrier?.objet,
      niveauConfidentiel: advanceTable.courrier?.niveauConfidentiel || 'ORDINAIRE',
      fichier_joint: advanceTable.courrier?.fichier_joint || '',
      nbre_fichiers: advanceTable.courrier?.nbre_fichiers || 0
    };
    
    this.httpClient.put(`${this.API_URL}/${advanceTable.id}`, apiData, this.getHttpOptions()).subscribe(
      (response: any) => {
        console.log('Update API response:', response);
        this.dialogData = advanceTable;
        // Recharger les données après modification
        this.getAllAdvanceTables();
      },
      (err: HttpErrorResponse) => {
        console.error('Update API error:', err);
        console.error('Error details:', err.error);
      }
    );
  }
  
  deleteAdvanceTable(id: number): void {
    console.log('Deleting courrier with ID:', id);
    this.httpClient.delete(`${this.API_URL}/${id}`, this.getHttpOptions()).subscribe(
      (response: any) => {
        console.log('Delete API response:', response);
        // Recharger les données après suppression
        this.getAllAdvanceTables();
      },
      (err: HttpErrorResponse) => {
        console.error('Delete API error:', err);
        console.error('Error details:', err.error);
      }
    );
  }
}
