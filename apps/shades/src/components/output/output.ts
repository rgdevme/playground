import { Component, computed, input, model, output } from '@angular/core';
import ColorNamer from 'color-namer';
import { getScale } from '../../utils/scale';
import { Format } from '../shadesList/shadesList';

@Component({
  selector: 'app-output',
  imports: [],
  templateUrl: './output.html',
  styleUrl: './output.css',
})
export class Output {
  steps = input.required<number>()
  format = input.required<Format>()
  visible = input.required<boolean>()
  colors = model.required<{ id: string, center: chroma.Color, }[]>()
  showOutput = output<void>()

  text = computed(() => {
    return this
      .colors()
      .map(({ center }) => {
        const name = ColorNamer(center.hex()).pantone[0].name.toLowerCase().replace(/\s/g, '-')

        return {
          id: name,
          value: getScale(
            center,
            this.steps(),
            this.format()
          ).map(c => ({
            id: `--color-${name}-${c.numbering}`,
            value:`--color-${name}-${c.numbering}: ${c.code};`
          }))}
      })

  })
}
