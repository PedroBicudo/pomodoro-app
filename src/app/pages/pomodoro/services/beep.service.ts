import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BeepService {

  audioContext: AudioContext = new AudioContext();
  beepSoundPath: string = "/assets/sounds/mp3/small_bell.mp3";

  constructor(
  ) {}

  async beep(): Promise<AudioBufferSourceNode> {
    return fetch(this.beepSoundPath)
      .then(response => response.arrayBuffer())
      .then(buffer => this.audioContext.decodeAudioData(buffer))
      .then(audio => {
        const source = this.audioContext.createBufferSource();
        source.buffer = audio;
        source.connect(this.audioContext.destination);
        return source;
      })
  }

}
