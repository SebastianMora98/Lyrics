import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  interval,
  lastValueFrom,
  map,
  takeWhile,
} from 'rxjs';
import { xml2js } from 'xml-js';
import { LyricsTTMLJSON } from '../models/lyrics';

@Injectable({
  providedIn: 'root',
})
export class LyricsService {
  http: HttpClient = inject(HttpClient);

  private lyricsJSONSubject: BehaviorSubject<LyricsTTMLJSON | null> =
    new BehaviorSubject<LyricsTTMLJSON | null>(null);

  private currentWordSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  private currentIndex = 0;

  private lyricsData: any[] = [];

  constructor() {}

  get lyricsJSONSubject$(): Observable<LyricsTTMLJSON | null> {
    return this.lyricsJSONSubject.asObservable();
  }

  get currentWordSubject$(): Observable<string> {
    return this.currentWordSubject.asObservable();
  }

  get lyricsJSON(): LyricsTTMLJSON | null {
    return this.lyricsJSONSubject.getValue();
  }

  async loadLyrics() {
    const res = await lastValueFrom(this.getXmlData());
    const ttmlObject: LyricsTTMLJSON = xml2js(res, {
      compact: true,
    }) as LyricsTTMLJSON;

    this.lyricsJSONSubject.next(ttmlObject);
  }

  getXmlData(): Observable<string> {
    return this.http.get('assets/lyrics_All My Life.xml', {
      responseType: 'text',
    });
  }

  play() {
    if (this.lyricsJSON) {
      console.log(this.lyricsJSON);
      this.lyricsJSON.tt.body.div.map((div) => {
        div.p.map((p) => {
          if (p.span) {
            if (Array.isArray(p.span)) {
              p.span.map((span) => {
                if (span._text) {
                  this.currentWordSubject.next(span._text);
                  this.lyricsData.push({
                    _text: span._text,
                    _attributes: {
                      begin: span._attributes.begin,
                      end: span._attributes.end,
                    },
                  });
                }
              });
            } else {
              if (p.span._text) {
                this.currentWordSubject.next(p.span._text);
              }
            }
          }
        });
      });

      console.log(this.lyricsData);
    } else {
      console.log('No lyrics loaded');
    }
  }

  public startLyrics(): void {
    this.emitWords(0); // Start from the first word
  }

  private emitWords(index: number): void {
    if (index < this.lyricsData.length - 1) {
      const currentWord = this.lyricsData[index];
      const nextWord = this.lyricsData[index + 1];

      const startTime = currentWord._attributes.begin * 1000; // Convert to milliseconds
      const endTime = nextWord._attributes.begin * 1000; // Convert to milliseconds

      const delayTime = endTime - startTime;

      setTimeout(() => {
        const word = currentWord._text;
        this.currentWordSubject.next(word);
        console.log(word);

        this.emitWords(index + 1); // Move to the next word
      }, delayTime);
    } else {
      // Reached the end of the lyrics
      const lastWord = this.lyricsData[index];
      const lastTime = lastWord._attributes.end * 1000;

      setTimeout(() => {
        const word = lastWord._text;
        this.currentWordSubject.next(word); // Emit the last word
      }, lastTime);
    }
  }
}
