import chroma from "chroma-js"
import { Format } from "../components/shadesList/shadesList"

export const scaleTo = (base: chroma.ChromaInput, color: 'white' | 'black', steps: number, format: Format) => {
  const edge = chroma(color)
  const target = chroma(base)
  const invert = edge.luminance() < target.luminance()

  const order = [edge, target]

  const isCss = format !== 'hex'

  const scale = chroma.scale(order)
    .mode('lab')
    .correctLightness()
    .colors(steps + 2)
    .map((hex, index) => ({
      id: hex,
      hex,
      code: isCss
        ? chroma(hex).css(format)
        : chroma(hex)[format](),
      percent: Math.round(100 - ((index - 1) * 100 / steps))
    }))

  if (invert) scale.reverse()

  return scale
}

export const getScale = (color: chroma.ChromaInput, steps: number, format: Format) => {
  const tints = scaleTo(color, 'white', steps, format)
  const shades = scaleTo(color, 'black', steps, format)

  const fullScale = [...tints, ...shades]
    .filter((x, i, a) => a.findIndex(y => y.hex === x.hex) === i)
    .slice(1, -1).map((c, i) => ({ ...c, numbering: (i) * 10 }))

  return fullScale

}