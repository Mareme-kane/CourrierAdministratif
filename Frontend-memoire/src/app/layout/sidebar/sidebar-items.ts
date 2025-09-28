import { RouteInfo } from './sidebar.metadata';

export const AGENT_BUREAU_ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'AGENT BUREAU COURRIER',
    icon: '',
    class: '',
    groupTitle: true,
    submenu: [
      {
        path: 'pages/agent-bureau/courrier-entrant',
        title: 'Courrier Entrant',
        icon: 'inbox',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'pages/agent-bureau/courrier-sortant',
        title: 'Courrier Sortant',
        icon: 'send',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'pages/agent-bureau/courrier-traite',
        title: 'Courrier Traité',
        icon: 'check-square',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'pages/agent-bureau/courrier-archive',
        title: 'Courrier Archivé',
        icon: 'archive',
        class: '',
        groupTitle: false,
        submenu: []
      }
    ]
  }
];

export const DIRECTEUR_ROUTES: RouteInfo[] = [
  {
    path: 'pages/directeur/tableau-de-bord',
    title: 'Tableau de bord',
    icon: 'bar-chart-2',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '',
    title: 'E-COURRIER',
    icon: '',
    class: '',
    groupTitle: true,
    submenu: [
      {
        path: 'pages/directeur/courrier-entrant',
        title: 'Courrier Entrant',
        icon: 'inbox',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'pages/directeur/courrier-impute',
        title: 'Courrier Imputé',
        icon: 'edit',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'pages/directeur/courrier-sortant',
        title: 'Courrier Sortant',
        icon: 'send',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'pages/directeur/courrier-traite',
        title: 'Courrier Traité',
        icon: 'check-square',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'pages/directeur/courrier-archive',
        title: 'Courrier Archivé',
        icon: 'archive',
        class: '',
        groupTitle: false,
        submenu: []
      }
    ]
  }
];

export const ADMIN_ROUTES: RouteInfo[] = [
  {
    path: 'pages/admin/tableau-de-bord',
    title: 'Tableau de bord',
    icon: 'bar-chart-2',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '',
    title: 'ADMINISTRATION',
    icon: '',
    class: '',
    groupTitle: true,
    submenu: [
      {
        path: 'pages/admin/utilisateurs',
        title: 'Utilisateurs',
        icon: 'users',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'pages/admin/roles',
        title: 'Rôles',
        icon: 'shield',
        class: '',
        groupTitle: false,
        submenu: []
      }
    ]
  }
];

export const ROUTES: RouteInfo[] = [];