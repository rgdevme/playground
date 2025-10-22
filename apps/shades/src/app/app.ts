import { Component, computed, model, signal } from '@angular/core';
import { Format, ShadesList } from '../components/shadesList/shadesList';
import { Topbar } from '../components/topbar/topbar';

@Component({
  imports: [Topbar, ShadesList],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'color-shades-generator';
  colors = signal([] as string[]);
  steps = 5
  format: Format = 'hex'
  output = 'css'

  addColor = () => {    
    const upd = [...this.colors()]
    upd.push(crypto.randomUUID())
    this.colors.set(upd)
  }

  removeColor = (index: number) => {
    const upd = [...this.colors()]
    upd.splice(index, 1)
    this.colors.set(upd)
  }

  showOutput = () => {
    alert('output!')
  }
}
