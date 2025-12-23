import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopbarComponent } from './topbar';
import { LanguageService } from '../../services/language';
import { PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
import { vi } from 'vitest'; // <-- ekle

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let mockLanguageService: any;

  beforeEach(async () => {
    mockLanguageService = {
      currentLang$: of('en'),
      setLanguage: vi.fn(), // <-- jasmine.createSpy yerine
      translate: (key: string) => key,
    };

    await TestBed.configureTestingModule({
      imports: [TopbarComponent, BrowserAnimationsModule],
      providers: [
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should call changeLanguage method', () => {
    component.changeLanguage('tr');
    expect(mockLanguageService.setLanguage).toHaveBeenCalledWith('tr');
  });
});
