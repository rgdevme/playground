import { Component } from '@angular/core';
import { ShadesList } from '../components/shadesList/shadesList';
import { Topbar } from '../components/topbar/topbar';

@Component({
  imports: [Topbar, ShadesList],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'color-shades-generator';
}
