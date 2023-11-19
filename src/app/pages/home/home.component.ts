import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { UploadCoverComponent } from './components/upload-cover/upload-cover.component';
import { ColorPaletteComponent } from './components/color-palette/color-palette.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    BackdropComponent,
    UploadCoverComponent,
    ColorPaletteComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
