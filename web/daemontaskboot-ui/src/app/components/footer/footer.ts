import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LanguageService } from '../../services/language';
import { ROUTES, EXTERNAL_ROUTES, getRoute } from '../../shared/constants/routes';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  // Expose route constants to template
  ROUTES = ROUTES;
  EXTERNAL_ROUTES = EXTERNAL_ROUTES;

  constructor(public langService: LanguageService) {}

  ngOnInit(): void {
    // Initialization code if needed
  }

  /**
   * Get route with leading slash - expose helper function to template
   */
  getRoute(route: string): string {
    return getRoute(route);
  }

  /**
   * Method for theme changing (implementation will be done when theme service is added)
   */
  toggleTheme(): void {
    console.log('Theme toggle clicked');
  }

  /**
   * Navigate to external link in new tab
   */
  openExternalLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
