import { ChangeDetectorRef, Component, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import ColorThief, { Color } from 'colorthief';

@Component({
  selector: 'app-color-palette',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-palette.component.html',
  styleUrl: './color-palette.component.scss',
})
export class ColorPaletteComponent {
  extractedColorPalette: Color[] = [];

  constructor(private cdRef: ChangeDetectorRef) {
    afterNextRender(() => {
      this.extractImageColors();
    });
  }

  extractImageColors() {
    const img = document.querySelector('img');
    const colorThief = new ColorThief();

    if (img?.complete) {
      this.extractedColorPalette = colorThief.getPalette(img, 5);
      // this.changeColors(this.mopl);
      console.log('1', this.extractedColorPalette);
    } else {
      img?.addEventListener('load', () => {
        this.extractedColorPalette = colorThief.getPalette(img, 5);
        // this.changeColors(this.mopl);
        console.log('2', this.extractedColorPalette);
      });
    }
  }

  changeColors(colors: Color[]) {
    console.log(`${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}`);
    document.documentElement.style.setProperty(
      '--color-bg1',
      `rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]})`
    );
    document.documentElement.style.setProperty(
      '--color-bg2',
      `rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]})`
    );
    document.documentElement.style.setProperty(
      '--color1',
      `${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}`
    );
    document.documentElement.style.setProperty(
      '--color2',
      `${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}`
    );
    document.documentElement.style.setProperty(
      '--color3',
      `${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]}`
    );
    document.documentElement.style.setProperty(
      '--color4',
      `${colors[3][0]}, ${colors[3][1]}, ${colors[3][2]}`
    );
    document.documentElement.style.setProperty(
      '--color5',
      `${colors[4][0]}, ${colors[4][1]}, ${colors[4][2]}`
    );

    this.cdRef.detectChanges();
  }
}
