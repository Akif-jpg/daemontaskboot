import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  public currentLang$ = this.currentLangSubject.asObservable();
  private translations: any = {};

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object, // Check if we are on server or browser
  ) {
    // Only access localStorage if we are in the browser
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('selectedLang') || 'en';
      this.setLanguage(savedLang);
    }
  }

  async setLanguage(lang: string) {
    try {
      const data = await firstValueFrom(this.http.get(`/i18n/${lang}.json`));
      this.translations = data;
      this.currentLangSubject.next(lang);

      // Guard for localStorage in setter method too
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('selectedLang', lang);
      }
    } catch (error) {
      console.error('Language loading failed:', error);
    }
  }

  translate(key: string): string {
    return this.translations[key] || key;
  }
}
