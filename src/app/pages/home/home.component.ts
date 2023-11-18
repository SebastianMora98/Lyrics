import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackdropComponent } from './components/backdrop/backdrop.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BackdropComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
