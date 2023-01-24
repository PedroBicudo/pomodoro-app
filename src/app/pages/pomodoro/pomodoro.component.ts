import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { PomodoroConfigService } from 'src/app/shared/services/pomodoro-config.service';
import PomodoroState from './models/pomodoro-state.model';
import { BeepService } from './services/beep.service';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {

  @ViewChild("countdown", {static: true})
  countDown!: CountdownComponent;

  currentState?: PomodoroState;
  statesQueue!: PomodoroState[];

  running: boolean = false;
  paused: boolean = false;

  constructor(
    private pomodoroConfigService: PomodoroConfigService,
    private beepService: BeepService
  ) { }

  ngOnInit(): void {
    this.populateCycleQueue();
    this.currentState = this.statesQueue.shift();
  }

  onStart() {
    this.running = true;
    this.paused = false;
    this.countDown.begin();
  }

  onPause() {
    this.paused = true;
    this.countDown.pause();
  }

  onStop() {
    this.running = false;
    this.paused = false;
    this.populateCycleQueue();
    this.currentState = this.statesQueue.shift();
    this.countDown.stop();
  }

  onUpdateState(event: CountdownEvent) {
    if (event.action === "done") {
      if (this.statesQueue.length === 0) this.populateCycleQueue();
      this.currentState = this.statesQueue.shift();
      this.running = false;
      this.paused = false;

      this.beepService.beep()
        .then(audio => {
          audio.start();
        })
        .catch(error => {
          console.error("Error: "+error);
        });
    }
  }

  populateCycleQueue() {
    this.statesQueue = [
      { name: "Pomodoro", config: this.pomodoroConfigService.pomodoroConfig() },
      { name: "Break", config: this.pomodoroConfigService.breakConfig() },
      { name: "Pomodoro", config: this.pomodoroConfigService.pomodoroConfig() },
      { name: "Break", config: this.pomodoroConfigService.breakConfig() },
      { name: "Pomodoro", config: this.pomodoroConfigService.pomodoroConfig() },
      { name: "Break", config: this.pomodoroConfigService.breakConfig() },
      { name: "Pomodoro", config: this.pomodoroConfigService.pomodoroConfig() },
      { name: "Long Break", config: this.pomodoroConfigService.longBreakConfig() }
    ];
  }

}
