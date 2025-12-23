import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer';
import { LanguageService } from '../../services/language';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let mockLanguageService: any;

  beforeEach(async () => {
    // LanguageService mock'u
    mockLanguageService = {
      currentLang$: of('en'),
      setLanguage: (lang: string) => {},
      translate: (key: string) => key,
    };

    await TestBed.configureTestingModule({
      imports: [FooterComponent, BrowserAnimationsModule],
      providers: [{ provide: LanguageService, useValue: mockLanguageService }, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have current year property', () => {
    expect(component.currentYear).toBe(new Date().getFullYear());
  });

  it('should render footer container', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const footerContainer = compiled.querySelector('.footer-container');
    expect(footerContainer).toBeTruthy();
  });

  it('should display copyright with current year', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const copyright = compiled.querySelector('.copyright');
    expect(copyright?.textContent).toContain(new Date().getFullYear().toString());
  });
});
