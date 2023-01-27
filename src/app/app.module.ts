import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CountdownModule } from 'ngx-countdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PomodoroComponent } from './pages/pomodoro/pomodoro.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { OptionComponent } from './pages/settings/components/option/option.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PomodoroComponent,
    SettingsComponent,
    OptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CountdownModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
