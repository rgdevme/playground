export enum TimerType {
  FOCUS,
  BREAK,
  pomodoro,
  breather,
  recess
}

export type Timer = {
  label: string;
  type: TimerType;
  seconds: number;
  sound: HTMLAudioElement;
  index: number
}