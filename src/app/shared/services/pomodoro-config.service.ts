import { Injectable } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';
import TimeConfig from '../models/time-config.model';

@Injectable({
  providedIn: 'root'
})
export class PomodoroConfigService {

  timeConfig: TimeConfig = {
    pomodoroMinutes: 25,
    breakMinutes: 5,
    longBreakMinutes: 15
  }

  constructor() { }

  updateConfig(timeConfig: TimeConfig) {
    this.timeConfig = timeConfig;
  }

  pomodoroConfig(): CountdownConfig {
    return {
      demand: true,
      leftTime: this.timeConfig.pomodoroMinutes * 60
    };
  }

  breakConfig(): CountdownConfig {
    return {
      demand: true,
      leftTime: this.timeConfig.breakMinutes * 60
    };
  }

  longBreakConfig(): CountdownConfig {
    return {
      demand: true,
      leftTime: this.timeConfig.longBreakMinutes * 60
    };
  }

  minutesFromState(stateName?: "Pomodoro" | "Break" | "Long Break" | "") {
    switch (stateName) {
      case 'Break': return this.timeConfig.breakMinutes;
      case 'Long Break': return this.timeConfig.longBreakMinutes;
      default: return this.timeConfig.pomodoroMinutes;
    }
  }

}
