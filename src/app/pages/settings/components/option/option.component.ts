import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import TimeConfig from 'src/app/shared/models/time-config.model';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit, OnDestroy {

  @Input() title!: string;
  @Input() type!: "pomodoro" | "break" | "longbreak";
  @Input() defaultMinute!: number;

  timeConfigSub$!: Subscription;

  initialTime!: number;
  time!: number;

  optionAction: "none" | "saving" | "saved" | "failed" = "none";

  changeOptionTimeout: any;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.timeConfigSub$ = this.settingsService
      .timeConfig$
      .subscribe((timeConfig: TimeConfig) => {
        if (this.type === 'break' && timeConfig.breakMinutes != this.initialTime) {
          this.time = timeConfig.breakMinutes;
          this.initialTime = this.time;

        } else if (this.type === 'longbreak' && timeConfig.longBreakMinutes != this.initialTime) {
          this.time = timeConfig.longBreakMinutes;
          this.initialTime = this.time;

        } else if (this.type === 'pomodoro' && timeConfig.pomodoroMinutes != this.initialTime) {
          this.time = timeConfig.pomodoroMinutes;
          this.initialTime = this.time;

        }

      })
  }

  onChangeOption() {
    if (this.changeOptionTimeout !== null) clearTimeout(this.changeOptionTimeout);
    this.optionAction = "saving";
    this.changeOptionTimeout = setTimeout(() => {
      this.onSaveOption();
    }, 1000);
  }

  onSaveOption() {
    try {
      this.settingsService.saveTimeSetting(this.type, this.time);
      this.optionAction = "saved";

    } catch (error) {
      this.optionAction = "failed";
    }

    setTimeout(() => {
      this.optionAction = "none";

    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timeConfigSub$ === null) return;
    if (this.changeOptionTimeout !== null) clearTimeout(this.changeOptionTimeout);

    this.timeConfigSub$.unsubscribe();
  }

}
