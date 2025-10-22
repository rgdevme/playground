import { Component, computed, input } from '@angular/core';
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
  color = chroma.random().hex()

  scale = computed(() => {
    const tints = chroma.scale(['white', this.color])
      .domain([0, 100])
      .mode('lab')
      .correctLightness()
      .colors(this.steps() + 2)
      .slice(1, -1)

    const shades = chroma.scale([this.color, 'black'])
      .domain([0, 100])
      .mode('lab')
      .correctLightness()
      .colors(this.steps() + 2)
      .slice(1, -1)


    const scale = [...tints, this.color, ...shades]
      .map((code, i, l) => {
        const c = chroma(code)
        const f = this.format()
        let x: string
        if (CSS_FORMATS.includes(f as CSS_Format)) x = c.css(f as CSS_Format)
        else x = c[f]() as string
        return ({
          hex: code,
          code: x,
          percent: Math.round((i * 100 / (l.length - 1)))
        })
      })

    return scale
  })

  middle = computed(() => {
    const s = this.scale()
    return s[Math.floor((s.length - 1) / 2)].hex
  })

}
