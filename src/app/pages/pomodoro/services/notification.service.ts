import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  iconPath: string = "/assets/img/png/tomato.png";

  constructor() { }

  notify(event: EventListener, keepalive: number, title?: string, message?: string) {
    if (!('Notification' in window)) return;

    Notification.requestPermission((permission) => {
      if (permission !== 'granted') return;

      const notification = new Notification(`${title}`, {
        body: message,
        icon: this.iconPath,
        dir: 'auto'
      });

      notification.addEventListener("click", event);

      setTimeout(() => {
        notification.close();
      }, keepalive)
    });

  }
}
