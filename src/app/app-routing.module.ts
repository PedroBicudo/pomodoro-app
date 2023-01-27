import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PomodoroComponent } from './pages/pomodoro/pomodoro.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {path: "pomodoro", component: PomodoroComponent},
  {path: "settings", component: SettingsComponent},
  {path: "", pathMatch: 'full', redirectTo: "/pomodoro"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
