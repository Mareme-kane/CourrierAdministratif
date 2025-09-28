import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from '../core/guard/role.guard';

const routes: Routes = [
  {
    path: 'pages',
    children: [
      {
        path: 'agent-bureau',
        loadChildren: () =>
          import('./agent-bureau-courrier/agent-bureau-courrier.module').then(
            (m) => m.AgentBureauCourrierModule
          ),
        canActivate: [RoleGuard],
        data: { role: 'AGENT_BUREAU_COURRIER' }
      },
      {
        path: 'directeur',
        loadChildren: () =>
          import('./directeur/directeur.module').then(
            (m) => m.DirecteurModule
          ),
        canActivate: [RoleGuard],
        data: { role: 'DIRECTEUR' }
      },
      // {
      //   path: 'secretaire',
      //   children: [
      //     {
      //       // path: 'dashboard',
      //       // loadChildren: () =>
      //       //   import('./secretaire/secretaire.module').then(
      //       //     (m) => m.DashboardModule
      //       //   ),
      //       // data: { role: 'SECRETAIRE_COURRIER' }
      //     }
      //   ]
      // },
      // {
      //   path: 'chef-service',
      //   children: [
      //     // Add chef-service routes here
      //   ]
      // },
      {
        path: 'admin',
        loadChildren: () =>
          import('./administrateur/administrateur.module').then(
            (m) => m.AdministrateurModule
          ),
        canActivate: [RoleGuard],
        data: { role: 'ADMIN' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
