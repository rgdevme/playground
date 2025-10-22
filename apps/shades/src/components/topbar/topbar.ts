import { Component, input, model, ModelSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorSketchModule } from 'ngx-color/sketch'
import { Format } from '../shadesList/shadesList';

@Component({
  imports: [ColorSketchModule, FormsModule],
  selector: 'app-topbar',
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  steps = model<number>()
  format = model<Format>()
  output = model<string>()
  addColor = output<void>()
  showOutput = output<void>()
}
