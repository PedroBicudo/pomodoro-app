import { CountdownConfig } from "ngx-countdown";

export default interface PomodoroState {
  name: "Pomodoro" | "Break" | "Long Break" | "";
  config: CountdownConfig
}
