import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AsyncPipe, DOCUMENT, TitleCasePipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink, 
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    TitleCasePipe,
    MatSlideToggleModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private document = inject(DOCUMENT);
  protected themeService = inject(ThemeService);


  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  // .pipe(
  //   map(result => result.matches),
    
    
  //   shareReplay()
  // );

  onThemeChange(event: MatSlideToggleChange) {
    this.document.body.classList.toggle('dark');
  }

}
