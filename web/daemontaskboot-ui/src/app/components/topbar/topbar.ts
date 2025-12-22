import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class TopbarComponent {
  // Inject our language service to use in the template
  constructor(public langService: LanguageService) {}

  // Function to handle language selection from UI
  changeLanguage(lang: string): void {
    this.langService.setLanguage(lang);
  }
}
