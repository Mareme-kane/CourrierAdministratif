import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: Date;
  avatar?: string;
}

const USERS_DATA: User[] = [
  { id: 1, name: 'Jean Dupont', email: 'jean.dupont@ecourrier.com', role: 'ADMIN', active: true, createdAt: new Date('2025-01-15') },
  { id: 2, name: 'Marie Martin', email: 'marie.martin@ecourrier.com', role: 'AGENT_BUREAU_COURRIER', active: true, createdAt: new Date('2025-01-14') },
  { id: 3, name: 'Pierre Durand', email: 'pierre.durand@ecourrier.com', role: 'SECRETAIRE', active: false, createdAt: new Date('2025-01-13') },
  { id: 4, name: 'Sophie Bernard', email: 'sophie.bernard@ecourrier.com', role: 'DIRECTEUR', active: true, createdAt: new Date('2025-01-12') },
  { id: 5, name: 'Luc Moreau', email: 'luc.moreau@ecourrier.com', role: 'AGENT_BUREAU_COURRIER', active: true, createdAt: new Date('2025-01-11') },
  { id: 6, name: 'Anne Petit', email: 'anne.petit@ecourrier.com', role: 'SECRETAIRE', active: false, createdAt: new Date('2025-01-10') },
  { id: 7, name: 'Michel Roux', email: 'michel.roux@ecourrier.com', role: 'AGENT_BUREAU_COURRIER', active: true, createdAt: new Date('2025-01-09') },
  { id: 8, name: 'Claire Blanc', email: 'claire.blanc@ecourrier.com', role: 'SECRETAIRE', active: true, createdAt: new Date('2025-01-08') },
  { id: 9, name: 'Paul Leroy', email: 'paul.leroy@ecourrier.com', role: 'DIRECTEUR', active: true, createdAt: new Date('2025-01-07') },
  { id: 10, name: 'Julie Garnier', email: 'julie.garnier@ecourrier.com', role: 'AGENT_BUREAU_COURRIER', active: false, createdAt: new Date('2025-01-06') },
];

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'avatar', 'name', 'role', 'status', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource(USERS_DATA);
  
  // Statistiques
  totalUsers = 200;
  activeUsers = 120;
  inactiveUsers = 80;

  constructor() { }

  ngOnInit(): void {
    this.updateStats();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByRole(role: string) {
    if (role) {
      this.dataSource.filterPredicate = (data: User) => {
        return data.role === role;
      };
      this.dataSource.filter = role;
    } else {
      this.dataSource.filterPredicate = (data: User, filter: string) => {
        return data.name.toLowerCase().includes(filter) ||
               data.email.toLowerCase().includes(filter) ||
               data.role.toLowerCase().includes(filter);
      };
      this.dataSource.filter = '';
    }
  }

  getRoleClass(role: string): string {
    switch (role) {
      case 'ADMIN': return 'admin';
      case 'AGENT_BUREAU_COURRIER': return 'agent';
      case 'SECRETAIRE': return 'secretaire';
      case 'DIRECTEUR': return 'directeur';
      default: return 'agent';
    }
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'ADMIN': return 'Administrateur';
      case 'AGENT_BUREAU_COURRIER': return 'Agent Bureau';
      case 'SECRETAIRE': return 'Secrétaire';
      case 'DIRECTEUR': return 'Directeur';
      default: return role;
    }
  }

  openAddUserDialog() {
    console.log('Ouvrir dialog d\'ajout d\'utilisateur');
    // Logique pour ouvrir le dialog d'ajout
  }

  editUser(user: User) {
    console.log('Modifier utilisateur:', user);
    // Logique pour modifier l'utilisateur
  }

  toggleUserStatus(user: User) {
    user.active = !user.active;
    this.updateStats();
    console.log('Statut utilisateur modifié:', user);
    // Logique pour changer le statut de l'utilisateur
  }

  resetPassword(user: User) {
    console.log('Réinitialiser mot de passe pour:', user);
    // Logique pour réinitialiser le mot de passe
  }

  deleteUser(user: User) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.name} ?`)) {
      const index = USERS_DATA.findIndex(u => u.id === user.id);
      if (index > -1) {
        USERS_DATA.splice(index, 1);
        this.dataSource.data = [...USERS_DATA];
        this.updateStats();
      }
      console.log('Utilisateur supprimé:', user);
    }
  }

  private updateStats() {
    this.totalUsers = USERS_DATA.length;
    this.activeUsers = USERS_DATA.filter(u => u.active).length;
    this.inactiveUsers = USERS_DATA.filter(u => !u.active).length;
  }
}