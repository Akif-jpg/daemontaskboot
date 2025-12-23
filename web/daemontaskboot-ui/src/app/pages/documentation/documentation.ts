import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LanguageService } from '../../services/language';

interface ApiEndpoint {
  method: string;
  endpoint: string;
  description: string;
}

@Component({
  selector: 'app-documentation',
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatChipsModule,
    MatTableModule,
    MatToolbarModule,
  ],
  templateUrl: './documentation.html',
  styleUrl: './documentation.scss',
})
export class Documentation {
  languageService = inject(LanguageService);

  displayedColumns: string[] = ['method', 'endpoint', 'description'];

  apiEndpoints: ApiEndpoint[] = [
    {
      method: 'GET',
      endpoint: '/api/watchers',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      method: 'POST',
      endpoint: '/api/watchers',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
      method: 'PUT',
      endpoint: '/api/watchers/:id',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation',
    },
    {
      method: 'DELETE',
      endpoint: '/api/watchers/:id',
      description: 'Duis aute irure dolor in reprehenderit in voluptate',
    },
  ];

  getMethodColor(method: string): 'primary' | 'accent' | 'warn' | undefined {
    switch (method) {
      case 'GET':
        return 'primary';
      case 'POST':
        return 'accent';
      case 'PUT':
        return 'warn';
      case 'DELETE':
        return 'warn';
      default:
        return undefined;
    }
  }

  copyCode(code: string): void {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        // Optionally show a success message
        console.log('Code copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy code: ', err);
      });
  }
}
