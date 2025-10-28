import { Component, signal } from '@angular/core';
import chroma from 'chroma-js';
import { ColorEvent } from 'ngx-color';
import { Output } from '../components/output/output';
import { Format, ShadesList } from '../components/shadesList/shadesList';
import { Topbar } from '../components/topbar/topbar';

@Component({
  imports: [Topbar, ShadesList, Output],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'color-shades-generator';
  colors = signal(Array.from({ length: 5 }, () => ({ id: crypto.randomUUID(), center: chroma.random() })));
  steps = signal(5)
  format = signal<Format>('hex')
  output = 'css'

  showOutput = false

  addColor = () => {
    this.colors.update(value => [
      ...value,
      { id: crypto.randomUUID(), center: chroma.random() }
    ])
  }

  removeColor = (index: number) => {
    this.colors.update((state) => {
      if (index < 0) return state
      const upd = [...state]
      upd.splice(index, 1)
      return upd
    })
  }

  updateScale = ({ color }: ColorEvent, index: number) => {
    this.colors.update(state => {
      state[index] = { ...state[index], center: chroma(color.hex) }
      return state
    })

  }

  updateCenter = (index: number, color: string) => {
    this.colors.update(value => {
      const upd = [...value]
      upd[index].center = color as any
      return upd
    })
  }

  toggleOutput = (state: boolean) => this.showOutput = state
}

