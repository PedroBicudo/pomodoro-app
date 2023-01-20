import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CountdownModule } from 'ngx-countdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PomodoroComponent } from './pages/pomodoro/pomodoro.component';
import { NavComponent } from './shared/components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PomodoroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CountdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
