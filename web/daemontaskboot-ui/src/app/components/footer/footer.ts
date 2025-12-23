import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  constructor(public langService: LanguageService) {}

  ngOnInit(): void {
    // İhtiyaç duyulursa başlangıç kodu
  }

  // Tema değiştirme için metod (tema servisi eklendiğinde implementasyon yapılacak)
  toggleTheme(): void {
    console.log('Tema değiştirme tıklandı');
  }
}
