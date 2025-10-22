import { Component, computed, input, model, output } from '@angular/core';
import chroma from 'chroma-js';
import { Shade } from '../shade/shade';
import { ShadeSelector } from '../shadeSelector/shadeSelector';
import { } from '@angular/common'

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
  color = model(chroma.random().hex())
  onRemove = output<void>()

  hexToShade = (hex: string, index: number = 0, total: any[] = []) => {
    const c = chroma(hex)
    const format = this.format()
    const isCss = format !== 'hex'

    const code = isCss ? c.css(format) : c[format]()
    const percent = !total.length ? 0 : Math.round(100 - ((index) * 100 / (total?.length - 1 || 1)))
    return ({ hex, code, percent })

  }

  scaleTo = (color: 'white' | 'black', steps = this.steps()) => {
    const edge = chroma(color)
    const target = chroma(this.color())
    const invert = edge.luminance() < target.luminance()

    const order = [edge, target]

    const scale = chroma.scale(order)
      .mode('lab')
      .correctLightness()
      .colors(steps + 2)
      .map(this.hexToShade)
      .slice(0, -1)

    if (invert) scale.reverse()

    return scale
  }

  scale = computed(() => {
    const tints = this.scaleTo('white')
    const shades = this.scaleTo('black')
    const middle = this.hexToShade(this.color())
    return [...tints, middle, ...shades]
      .slice(1, -1)
  })


}
