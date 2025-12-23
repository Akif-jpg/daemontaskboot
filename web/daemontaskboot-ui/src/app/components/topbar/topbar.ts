import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class TopbarComponent implements OnInit {
  private isBrowser: boolean;

  constructor(
    public langService: LanguageService,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Only run in browser environment
    if (this.isBrowser) {
      this.initializeLanguage();
    }
  }

  private initializeLanguage(): void {
    if (!this.isBrowser) return;

    const savedLang = this.getLocalStorage('preferred-language');

    if (!savedLang) {
      // Get user's browser language preference
      const browserLang = navigator.language.split('-')[0]; // 'en-US' -> 'en'

      // Use if among supported languages, otherwise default to 'en'
      const supportedLangs = ['en', 'tr'];
      const langToUse = supportedLangs.includes(browserLang) ? browserLang : 'en';

      this.langService.setLanguage(langToUse);
    }
  }

  changeLanguage(lang: string): void {
    this.langService.setLanguage(lang);
    // Save user preference (only in browser)
    if (this.isBrowser) {
      this.setLocalStorage('preferred-language', lang);
    }
  }

  // localStorage helper methods
  private getLocalStorage(key: string): string | null {
    if (!this.isBrowser) return null;
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage access failed:', e);
      return null;
    }
  }

  private setLocalStorage(key: string, value: string): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage save failed:', e);
    }
  }
}
