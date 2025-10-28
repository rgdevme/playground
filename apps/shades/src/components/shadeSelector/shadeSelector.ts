import { TitleCasePipe } from '@angular/common';
import { Component, computed, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import chroma, { Color } from 'chroma-js';
import ColorNamer from 'color-namer';
import { ColorEvent } from 'ngx-color';
import { ColorChromeModule } from 'ngx-color/chrome';
import { ColorSketchModule } from 'ngx-color/sketch';
import { Button } from '../button/button';

@Component({
  selector: 'app-shade-selector',
  imports: [FormsModule, TitleCasePipe, Button, ColorSketchModule, ColorChromeModule],
  templateUrl: './shadeSelector.html',
  styleUrl: './shadeSelector.css',
})
export class ShadeSelector {
  code = model.required<Color>()
  name = computed(() => ColorNamer(this.code().hex()).pantone[0].name)
  onRemove = output<void>()
  showPicker = false

  togglePicker(state: boolean) {
    this.showPicker = state
  }

  handleColorChange(event: ColorEvent | string) {
    const input = typeof event === 'string'
      ? event
      : event.color.hex
    this.code.set(chroma(input))
  }
}
