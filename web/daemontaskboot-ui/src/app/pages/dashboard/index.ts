import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="dashboard-container">
      <mat-card class="welcome-card">
        <mat-card-header>
          <mat-icon mat-card-avatar>dashboard</mat-icon>
          <mat-card-title>{{ languageService.translate('DASHBOARD_TITLE') }}</mat-card-title>
          <mat-card-subtitle>{{ languageService.translate('WELCOME_MESSAGE') }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Dashboard component is working! This is a placeholder for the main dashboard.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        padding: 24px;
        max-width: 1200px;
        margin: 0 auto;
      }
      .welcome-card {
        margin-bottom: 24px;
      }
    `,
  ],
})
export class Dashboard {
  constructor(public languageService: LanguageService) {}
}

// Also export as default for lazy loading
export default Dashboard;
