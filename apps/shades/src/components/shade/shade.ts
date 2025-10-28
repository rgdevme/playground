import { Component, computed, input } from '@angular/core';
import chroma from 'chroma-js';

@Component({
  selector: 'app-shade',
  templateUrl: './shade.html',
  styleUrl: './shade.css'
})
export class Shade {
  marked = input.required<boolean>()
  color = input.required<{ code: string; percent: number; }>()
  invert = computed(() => {
    const { code } = this.color()
    const contrast = chroma.contrast('black', code)
    return contrast <= 5 ? 'white' : 'black'
  })
}
