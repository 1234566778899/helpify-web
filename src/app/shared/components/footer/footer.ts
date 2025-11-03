import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  openSocialMedia(platform: string): void {
    const urls: { [key: string]: string } = {
      tiktok: 'https://www.tiktok.com/@helpify',
      facebook: 'https://www.facebook.com/helpify',
      instagram: 'https://www.instagram.com/helpify'
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  }
}