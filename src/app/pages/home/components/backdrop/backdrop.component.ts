import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
  afterNextRender,
} from '@angular/core';

import ColorThief, { Color } from 'colorthief';
import { LyricsComponent } from '../lyrics/lyrics.component';

@Component({
  selector: 'app-backdrop',
  standalone: true,
  imports: [CommonModule, LyricsComponent],
  templateUrl: './backdrop.component.html',
  styleUrl: './backdrop.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BackdropComponent {
  @Input() imageElement: HTMLImageElement | undefined;
  backgroud1: string = 'rgb(255, 255, 255)';
  backgroud2: string = 'rgb(255, 255, 255)';
}
