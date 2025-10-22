import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Calculator } from '../components/calculator';

@Component({
  imports: [RouterModule, Calculator],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'calculator';
}
