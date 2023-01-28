import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { Subscription } from 'rxjs';
import TimeConfig from 'src/app/shared/models/time-config.model';
import { PomodoroConfigService } from 'src/app/shared/services/pomodoro-config.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import PomodoroState from './models/pomodoro-state.model';
import { BeepService } from './services/beep.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit, OnDestroy {

  @ViewChild("countdown", {static: true})
  countDown!: CountdownComponent;

  currentState?: PomodoroState;
  statesQueue!: PomodoroState[];

  running: boolean = false;
  paused: boolean = false;

  timeConfigSub$!: Subscription;

  constructor(
    private pomodoroConfigService: PomodoroConfigService,
    private settingsService: SettingsService,
    private beepService: BeepService,
    private notificationService: NotificationService,
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.timeConfigSub$ = this.settingsService.timeConfig$
      .subscribe((timeConfig: TimeConfig) => {
        this.pomodoroConfigService.updateConfig(timeConfig);
        this.onStop();
      });
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
    if (event.action !== "done") return;
    this.onDone();
  }

  onDone() {
    this.onNext();
    this.notifySession();
    this.startIfCurrentStateNameIsBreakOrLongBreak();
    this.startBeepSound();
  }

  onNext() {
    if (this.statesQueue.length === 0) this.populateCycleQueue();

    this.currentState = this.statesQueue.shift();
    this.running = false;
    this.paused = false;

  }

  private notifySession() {
    const sessionChangeEvent = () => {
      if (this.currentState?.name !== 'Pomodoro') return;

      this.onStart();
      this.changeRef.detectChanges();
    };

    let message = this.getMinutesOrSecondsLeft();
    if (this.currentState?.name === 'Pomodoro') {
      message += "Click the button to Start Pomodoro.";
    }

    this.notificationService.notify(
      sessionChangeEvent,
      3000,
      this.currentState?.name,
      message,
    );

  }

  private getMinutesOrSecondsLeft(): string {
    const minutesLeft = this.pomodoroConfigService.minutesFromState(this.currentState?.name);

    if (minutesLeft < 1) {
      return `${minutesLeft*60} seconds left.`;
    }

    return `${minutesLeft} minutes left.`;
  }

  private startIfCurrentStateNameIsBreakOrLongBreak() {
    setTimeout(() => {
      if (this.currentState?.name !== 'Pomodoro') {
        this.onStart();
      }
    }, 0);
  }

  private startBeepSound() {
    this.beepService.beep()
      .then(audio => {
        audio.start();
      })
      .catch(error => {
        console.error("Error: "+error);
      });
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

  ngOnDestroy(): void {
    if (this.timeConfigSub$ === null) return;
    this.timeConfigSub$.unsubscribe();
  }

}
