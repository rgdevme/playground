import chroma from 'chroma-js';
import { reactive, watch } from "vue";
import calm from '../../assets/calm.wav';
import chord from '../../assets/chord.wav';
import chord2 from '../../assets/chord2.wav';
import { TimerType } from '../types';

type Settings = typeof initialSettings
type Setting = keyof Settings

const initialSettings = {
  tab: 'timer' as 'timer' | 'settings',
  pomodoro: {
    type: TimerType.pomodoro,
    label: 'Pomodoro',
    seconds: 25,
    sound: new Audio(chord)
  },
  breather: {
    type: TimerType.breather,
    label: 'Breather',
    seconds: 5,
    sound: new Audio(chord2)
  },
  recess: {
    type: TimerType.recess,
    label: 'Recess',
    seconds: 15,
    sound: new Audio(chord2)
  },
  rounds: 3,
  roundSize: 4,
  finishSound: new Audio(calm),
  startOnOpen: false,
  mode: 'system' as 'light' | 'dark' | 'system',
  volume: 0.2,
  muted: false,
  color: chroma('hsl(162, 85%, 50%)').hex(),
  direction: 'down' as 'up' | 'down'
}

const storedValue = localStorage.getItem('settings')
const storedSettings: Settings = storedValue ? JSON.parse(storedValue) : {}

const settings = reactive({ ...initialSettings, ...storedSettings })

watch(settings, ({ tab, ...newValue }) => {
  localStorage.setItem('settings', JSON.stringify(newValue))
})

export const useSettings = () => ({ ...settings })
export const updateSettings = (update: Partial<Settings>) => {
  for (const key in update) {
    (settings as any)[key] = update[key as Setting]
  }
}