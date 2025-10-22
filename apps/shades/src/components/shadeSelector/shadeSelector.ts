import { Component, computed, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import ColorNamer from 'color-namer';
import { TitleCasePipe } from '@angular/common'

@Component({
  selector: 'app-shade-selector',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './shadeSelector.html',
  styleUrl: './shadeSelector.css',
})
export class ShadeSelector {
  code = model<string>('')
  name = computed(() => ColorNamer(this.code()).pantone[0].name)
  onRemove = output<void>()
}
