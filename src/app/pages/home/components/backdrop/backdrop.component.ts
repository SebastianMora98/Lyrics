import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

import ColorThief, { Color } from 'colorthief';

@Component({
  selector: 'app-backdrop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backdrop.component.html',
  styleUrl: './backdrop.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BackdropComponent {
  mopl: any;
  blur: boolean = true;

  backgroud1: string = 'rgb(255, 255, 255)';
  backgroud2: string = 'rgb(255, 255, 255)';

  ngOnInit() {
    const img = document.querySelector('img');

    const colorThief = new ColorThief();

    if (img?.complete) {
      this.mopl = colorThief.getPalette(img, 5);
      // this.changeColors(this.mopl);
      console.log('1', this.mopl);
    } else {
      img?.addEventListener('load', () => {
        this.mopl = colorThief.getPalette(img, 5);
        // this.changeColors(this.mopl);
        console.log('2', this.mopl);
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
  }

  toggleblur() {
    this.blur = !this.blur;
  }
}
