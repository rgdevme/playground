import { Component, computed, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import ColorNamer from 'color-namer';

@Component({
  selector: 'app-shade-selector',
  imports: [FormsModule],
  templateUrl: './shadeSelector.html',
  styleUrl: './shadeSelector.css',
})
export class ShadeSelector {
  code = model<string>('')
  name = computed(() => ColorNamer(this.code()).html[0].name)
}
