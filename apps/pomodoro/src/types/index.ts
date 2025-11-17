export enum TimerType {
  FOCUS,
  BREAK
}

export type Timer = {
  index: number;
  label: string;
  type: TimerType;
  seconds: number;
}