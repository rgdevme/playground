import { Component, computed, input, output } from '@angular/core';
import chroma from 'chroma-js';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  label = input<string>()
  leftIcon = input<string>()
  rightIcon = input<string>()
  variant = input<'outlined' | 'subtle' >('outlined')

  color = input<string>('#2f4f4f')

  singleIcon = computed(() => {
    if (this.label()?.length) return false
    if (this.leftIcon() && this.rightIcon()) return false
    return !!(this.leftIcon() || this.rightIcon())
  })

  cssvars = computed(() => {
    const c = chroma(this.color())
    const base = c.hex()
    const active = c.darken(1).hex()

    const vars = `--bg:${base}; --bg-active:${active}`

    return vars
  })

  onClick = output<void>()
}
