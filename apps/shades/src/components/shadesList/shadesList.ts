import { Component, computed, input, model, output } from '@angular/core';
import { Color } from 'chroma-js';
import { getScale } from '../../utils/scale';
import { Shade } from '../shade/shade';
import { ShadeSelector } from '../shadeSelector/shadeSelector';

const CSS_FORMATS = ["rgb", "hsl", "lab", "lch", "oklab", "oklch"] as const
export type CSS_Format = (typeof CSS_FORMATS)[number]
export type Format = CSS_Format | 'hex'

@Component({
  selector: 'app-shades-list',
  imports: [Shade, ShadeSelector],
  templateUrl: './shadesList.html',
  styleUrl: './shadesList.css',
})
export class ShadesList {
  id = input.required<string>()
  steps = input.required<number>()
  format = input.required<Format>()

  color = model.required<Color>()

  scale = computed(() => getScale(this.color(), this.steps(), this.format()))

  onRemove = output<void>()
  updateCenter = output<any>()

  updateColor = (color: any) => {
    console.log({color});
    this.updateCenter.emit(color)
    this.color.set(color)
  }
}
