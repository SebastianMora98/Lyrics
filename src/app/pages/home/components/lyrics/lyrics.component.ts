import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LyricsService } from './services/lyrics.service';

@Component({
  selector: 'app-lyrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lyrics.component.html',
  styleUrl: './lyrics.component.scss',
})
export class LyricsComponent {
  lyricsService: LyricsService = inject(LyricsService);

  constructor() {
    this.lyricsService.lyricsJSONSubject$.subscribe((res) => {
      if (res) {
        // console.log(res);
      }
    });

    this.lyricsService.currentWordSubject$.subscribe((res) => {
      // console.log(res);
    });

    // this.lyricsService.startLyrics();
  }

  async ngOnInit() {
    const res = await this.lyricsService.loadLyrics();
    this.lyricsService.play();
    this.lyricsService.startLyrics();
  }

  replay() {
    // this.lyricsService.startLyrics();
  }
}
