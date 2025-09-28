export class User {
  id: number;
  ien_ens:string;
  prenom_ens:string;
  nom_ens:string;
  sexe_ens:string;
  date_nais:string;
  lieu_nais:string;
   CNI_ens:string;
   matricule_ens:string;
    username:string;
    email_ens:string;
    email_ens_pro:string;
     password:string;
  token?: string;
}

export interface ApiResponse<T> {
  status: string;
  data?: T;
  message?: string;
  errors?: any;
}

export interface LoginRequest {
   email_ens_pro: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  token_type: string;
  expires_in: number;
}

export enum Role {
  ADMIN = 'ADMIN',
  AGENT_BUREAU_COURRIER = 'AGENT_BUREAU_COURRIER',
  SECRETAIRE = 'SECRETAIRE',
  DIRECTEUR = 'DIRECTEUR',
  CHEF_SERVICE = 'CHEF_SERVICE'
}
