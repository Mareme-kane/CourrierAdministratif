import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Role {
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  userCount: number;
  active: boolean;
}

export interface Permission {
  name: string;
  description: string;
  category: string;
}

const ROLES_DATA: Role[] = [
  {
    name: 'ADMIN',
    displayName: 'Administrateur',
    description: 'Accès complet au système, gestion des utilisateurs et des rôles',
    permissions: ['USER_MANAGE', 'ROLE_MANAGE', 'SYSTEM_CONFIG', 'COURRIER_VIEW', 'COURRIER_MANAGE', 'REPORTS_VIEW'],
    userCount: 2,
    active: true
  },
  {
    name: 'AGENT_BUREAU_COURRIER',
    displayName: 'Agent Bureau Courrier',
    description: 'Gestion des courriers entrants et sortants',
    permissions: ['COURRIER_CREATE', 'COURRIER_EDIT', 'COURRIER_VIEW', 'COURRIER_ARCHIVE'],
    userCount: 15,
    active: true
  },
  {
    name: 'SECRETAIRE',
    displayName: 'Secrétaire',
    description: 'Traitement et suivi des courriers',
    permissions: ['COURRIER_VIEW', 'COURRIER_EDIT', 'COURRIER_PROCESS'],
    userCount: 8,
    active: true
  },
  {
    name: 'DIRECTEUR',
    displayName: 'Directeur',
    description: 'Validation et supervision des courriers',
    permissions: ['COURRIER_VIEW', 'COURRIER_VALIDATE', 'COURRIER_ASSIGN', 'REPORTS_VIEW'],
    userCount: 3,
    active: true
  }
];

const PERMISSIONS_DATA: Permission[] = [
  { name: 'USER_MANAGE', description: 'Gérer les utilisateurs', category: 'Administration' },
  { name: 'ROLE_MANAGE', description: 'Gérer les rôles et permissions', category: 'Administration' },
  { name: 'SYSTEM_CONFIG', description: 'Configuration du système', category: 'Administration' },
  { name: 'COURRIER_CREATE', description: 'Créer des courriers', category: 'Courriers' },
  { name: 'COURRIER_EDIT', description: 'Modifier des courriers', category: 'Courriers' },
  { name: 'COURRIER_VIEW', description: 'Consulter les courriers', category: 'Courriers' },
  { name: 'COURRIER_MANAGE', description: 'Gestion complète des courriers', category: 'Courriers' },
  { name: 'COURRIER_ARCHIVE', description: 'Archiver des courriers', category: 'Courriers' },
  { name: 'COURRIER_PROCESS', description: 'Traiter les courriers', category: 'Courriers' },
  { name: 'COURRIER_VALIDATE', description: 'Valider les courriers', category: 'Courriers' },
  { name: 'COURRIER_ASSIGN', description: 'Assigner des courriers', category: 'Courriers' },
  { name: 'REPORTS_VIEW', description: 'Consulter les rapports', category: 'Rapports' }
];

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles = ROLES_DATA;
  permissions = PERMISSIONS_DATA;
  permissionsDataSource = new MatTableDataSource(PERMISSIONS_DATA);
  permissionColumns: string[] = ['permission', 'admin', 'agent', 'secretaire', 'directeur'];
  
  // Statistiques
  totalRoles = 6;
  activeRoles = 4;
  totalPermissions = 12;

  constructor() { }

  ngOnInit(): void {
    this.updateStats();
    this.setupPermissionColumns();
  }

  setupPermissionColumns() {
    this.permissionColumns = ['permission'];
    this.roles.forEach(role => {
      this.permissionColumns.push(role.name.toLowerCase());
    });
  }

  getRoleCardClass(roleName: string): string {
    switch (roleName) {
      case 'ADMIN': return 'admin-card';
      case 'AGENT_BUREAU_COURRIER': return 'agent-card';
      case 'SECRETAIRE': return 'secretaire-card';
      case 'DIRECTEUR': return 'directeur-card';
      default: return 'default-card';
    }
  }

  getRoleIcon(roleName: string): string {
    switch (roleName) {
      case 'ADMIN': return 'admin_panel_settings';
      case 'AGENT_BUREAU_COURRIER': return 'mail';
      case 'SECRETAIRE': return 'edit_note';
      case 'DIRECTEUR': return 'supervisor_account';
      default: return 'person';
    }
  }

  getPermissionLabel(permissionName: string): string {
    const permission = this.permissions.find(p => p.name === permissionName);
    return permission ? permission.description : permissionName;
  }

  hasPermission(roleName: string, permissionName: string): boolean {
    const role = this.roles.find(r => r.name === roleName);
    return role ? role.permissions.includes(permissionName) : false;
  }

  togglePermission(roleName: string, permissionName: string, checked: boolean) {
    const role = this.roles.find(r => r.name === roleName);
    if (role) {
      if (checked) {
        if (!role.permissions.includes(permissionName)) {
          role.permissions.push(permissionName);
        }
      } else {
        const index = role.permissions.indexOf(permissionName);
        if (index > -1) {
          role.permissions.splice(index, 1);
        }
      }
    }
    console.log(`Permission ${permissionName} ${checked ? 'accordée' : 'retirée'} pour le rôle ${roleName}`);
  }

  applyPermissionFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.permissionsDataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddRoleDialog() {
    console.log('Ouvrir dialog d\'ajout de rôle');
    // Logique pour ouvrir le dialog d'ajout
  }

  editRole(role: Role) {
    console.log('Modifier rôle:', role);
    // Logique pour modifier le rôle
  }

  deleteRole(role: Role) {
    if (role.name === 'ADMIN') {
      alert('Le rôle Administrateur ne peut pas être supprimé');
      return;
    }
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer le rôle ${role.displayName} ?`)) {
      const index = this.roles.findIndex(r => r.name === role.name);
      if (index > -1) {
        this.roles.splice(index, 1);
        this.updateStats();
        this.setupPermissionColumns();
      }
      console.log('Rôle supprimé:', role);
    }
  }

  viewRoleDetails(role: Role) {
    console.log('Voir détails du rôle:', role);
    // Logique pour afficher les détails du rôle
  }

  private updateStats() {
    this.totalRoles = this.roles.length;
    this.activeRoles = this.roles.filter(r => r.active).length;
    this.totalPermissions = this.permissions.length;
  }
}