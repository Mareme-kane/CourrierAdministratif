export class AdvanceTable {
  id: number;
  courrier_id: number;
  expediteur: string;
  dateArrivee: string;
  created_at: string;
  updated_at: string;
  courrier: {
    id: number;
    reference: string;
    objet: string;
    niveauConfidentiel: 'CONFIDENTIEL' | 'ORDINAIRE';
    statutCourrier: 'EN_TRAITEMENT' | 'TRAITE' | 'ARCHIVE' | 'IMPUTE' | 'EN_COURS' | 'ENVOYE' | 'VALIDE' | 'NON_VALIDE';
    fichier_joint: string;
    nbre_fichiers: number;
    created_at: string;
    updated_at: string;
  };

  constructor(data: any = {}) {
    this.id = data.id || 0;
    this.courrier_id = data.courrier_id || 0;
    this.expediteur = data.expediteur || '';
    this.dateArrivee = data.dateArrivee || '';
    this.created_at = data.created_at || '';
    this.updated_at = data.updated_at || '';
    this.courrier = data.courrier || {
      id: 0,
      reference: '',
      objet: '',
      niveauConfidentiel: 'ORDINAIRE',
      statutCourrier: 'EN_COURS',
      fichier_joint: '',
      nbre_fichiers: 0,
      created_at: '',
      updated_at: ''
    };
  }
}
