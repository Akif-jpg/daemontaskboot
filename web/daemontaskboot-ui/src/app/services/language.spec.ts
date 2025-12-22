import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LanguageService } from './language';
import { firstValueFrom } from 'rxjs';

describe('LanguageService', () => {
  let service: LanguageService;
  let httpMock: HttpTestingController;

  const mockTranslations = {
    DASHBOARD_TITLE: 'Sistem Görev Yöneticisi',
    ADD_TASK: 'Yeni Görev',
  };

  beforeEach(() => {
    // Clear localStorage to ensure isolation between tests
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LanguageService],
    });

    httpMock = TestBed.inject(HttpTestingController);

    // Inject service AFTER localStorage is cleared
    service = TestBed.inject(LanguageService);

    // Handle the initial request triggered by constructor
    // We use match() because the URL depends on localStorage state
    const requests = httpMock.match((request) => request.url.includes('/i18n/'));
    requests.forEach((req) => req.flush({}));
  });

  afterEach(() => {
    // Ensure no pending requests are left
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default language "en"', async () => {
    const lang = await firstValueFrom(service.currentLang$);
    expect(lang).toBe('en');
  });

  it('should change language and load JSON data via setLanguage', async () => {
    const newLang = 'tr';

    const setLangPromise = service.setLanguage(newLang);

    const req = httpMock.expectOne(`/i18n/${newLang}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTranslations);

    await setLangPromise;

    expect(service.translate('DASHBOARD_TITLE')).toBe('Sistem Görev Yöneticisi');
    expect(localStorage.getItem('selectedLang')).toBe(newLang);
  });

  it('should return the key itself if the translation is missing', () => {
    const fallback = service.translate('NON_EXISTENT_KEY');
    expect(fallback).toBe('NON_EXISTENT_KEY');
  });
});
