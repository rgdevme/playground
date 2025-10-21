import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { Calculator } from '../components/calculator';

@Component({
  imports: [NxWelcome, RouterModule, Calculator],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'calculator';
}
