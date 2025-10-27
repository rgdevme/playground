import { Component, computed, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import ColorNamer from 'color-namer';
import { TitleCasePipe } from '@angular/common'
import { Button } from '../button/button';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorChromeModule } from 'ngx-color/chrome';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-shade-selector',
  imports: [FormsModule, TitleCasePipe, Button, ColorSketchModule, ColorChromeModule],
  templateUrl: './shadeSelector.html',
  styleUrl: './shadeSelector.css',
})
export class ShadeSelector {
  code = model<string>('')
  name = computed(() => ColorNamer(this.code()).pantone[0].name)
  onRemove = output<void>()
  showPicker = false

  togglePicker(state: boolean) {
    this.showPicker = state
  }

  handleColorChange($event: ColorEvent) {
    console.log($event.color);
    this.code.set($event.color.hex)
  }
}
