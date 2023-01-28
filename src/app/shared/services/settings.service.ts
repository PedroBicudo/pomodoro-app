import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import TimeConfig from '../models/time-config.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  timeConfig: TimeConfig = {
    pomodoroMinutes: this.getOrDefaultTimeSetting("pomodoro", 25),
    breakMinutes: this.getOrDefaultTimeSetting("break", 5),
    longBreakMinutes: this.getOrDefaultTimeSetting("longbreak", 15)
  };

  timeConfig$: BehaviorSubject<TimeConfig> = new BehaviorSubject(this.timeConfig);

  constructor() { }

  saveTimeSetting(name: "pomodoro" | "break" | "longbreak", minutes: number) {
    localStorage.setItem(name, `${minutes}`);
    switch(name) {
      case 'break':
        this.timeConfig.breakMinutes = minutes;
        break;

      case 'longbreak':
        this.timeConfig.longBreakMinutes = minutes;
        break;

      case 'pomodoro':
        this.timeConfig.pomodoroMinutes = minutes;
        break;
    }

    this.timeConfig$.next(this.timeConfig);
  }

  getOrDefaultTimeSetting(name: "pomodoro" | "break" | "longbreak", defaultMinute: number): number {
    const settingMinute = localStorage.getItem(name);
    if (!settingMinute) {
      return defaultMinute;
    }

    const minute = Number.parseFloat(settingMinute);
    if (this.isInvalidMinute(minute)) {
      localStorage.removeItem(name);
      return defaultMinute;
    }

    return minute;
  }

  private isInvalidMinute(minute: number): boolean {
    return isNaN(minute) || minute < 0.1;
  }

}
