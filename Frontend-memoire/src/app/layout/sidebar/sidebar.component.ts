import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy
} from '@angular/core';
import { ROUTES, AGENT_BUREAU_ROUTES, DIRECTEUR_ROUTES, ADMIN_ROUTES } from './sidebar-items';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.sass'],
    standalone: false
})
export class SidebarComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, OnDestroy
{
  public sidebarItems: any[];
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  headerHeight = 60;
  routerObj = null;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private router: Router
  ) {
    super();
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, 'overlay-open');
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  windowResizecall(event) {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callToggleMenu(event: any, length: any) {
    if (length > 0) {
      const parentElement = event.target.closest('li');
      const activeClass = parentElement.classList.contains('active');

      if (activeClass) {
        this.renderer.removeClass(parentElement, 'active');
      } else {
        this.renderer.addClass(parentElement, 'active');
      }
    }
  }
  ngOnInit() {
    this.sidebarItems = [];
    
    // Écouter les changements d'utilisateur
    this.subs.sink = this.authService.currentUser.subscribe(user => {
      if (user) {
        this.loadSidebarByRole();
      }
    });
    
    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }

  private loadSidebarByRole() {
    const userRole = this.authService.getCurrentUserRole();
    console.log('Loading sidebar for role:', userRole);
    
    switch (userRole) {
      case 'AGENT_BUREAU_COURRIER':
        this.sidebarItems = AGENT_BUREAU_ROUTES;
        console.log('Loaded AGENT_BUREAU_ROUTES:', this.sidebarItems);
        break;
      case 'DIRECTEUR':
        this.sidebarItems = DIRECTEUR_ROUTES;
        console.log('Loaded DIRECTEUR_ROUTES:', this.sidebarItems);
        break;
      case 'ADMIN':
        this.sidebarItems = ADMIN_ROUTES;
        console.log('Loaded ADMIN_ROUTES:', this.sidebarItems);
        break;
      default:
        this.sidebarItems = AGENT_BUREAU_ROUTES;
        console.log('Default: Loaded AGENT_BUREAU_ROUTES:', this.sidebarItems);
    }
  }
  
  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }
  initLeftSidebar() {
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
}
