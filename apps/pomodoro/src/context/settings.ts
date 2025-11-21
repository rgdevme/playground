import chroma from 'chroma-js';
import { onMounted, reactive, watch } from "vue";
import calm from '../../assets/calm.wav';
import chord from '../../assets/chord.wav';
import chord2 from '../../assets/chord2.wav';
import { TimerType } from '../types';

export type Settings = typeof defaultSettings
export type Setting = keyof Settings

const defaultSettings = {
  tab: 'timer' as 'timer' | 'settings',
  pomodoro: {
    type: TimerType.pomodoro,
    label: 'Pomodoro',
    minutes: 25,
    sound: new Audio(chord)
  },
  breather: {
    type: TimerType.breather,
    label: 'Breather',
    minutes: 5,
    sound: new Audio(chord2)
  },
  recess: {
    type: TimerType.recess,
    label: 'Recess',
    minutes: 15,
    sound: new Audio(chord2)
  },
  rounds: 3,
  roundSize: 4,
  finishSound: new Audio(calm),
  startOnOpen: false,
  mode: 'system' as 'light' | 'dark' | 'system',
  volume: 0.2,
  muted: false,
  color: chroma('#13ecab26').hex(),
  countdown: true
}

const storedValue = localStorage.getItem('settings')
const storedSettings: Settings = storedValue ? JSON.parse(storedValue) : {}


const initialSettings = { ...defaultSettings, ...storedSettings }
initialSettings.pomodoro.sound = defaultSettings.pomodoro.sound
initialSettings.breather.sound = defaultSettings.breather.sound
initialSettings.recess.sound = defaultSettings.recess.sound

export const settings = reactive(initialSettings)

const store = (data: Omit<Settings, 'tab'>) => {
  localStorage.setItem('settings', JSON.stringify(data))
}

store(settings)
watch(() => JSON.parse(JSON.stringify({ ...settings })) as Settings, ({ tab, ...newValue }, old) => {
  if (newValue.color !== old.color) document.documentElement.style.setProperty("--bg", newValue.color);
  store(newValue)
})
