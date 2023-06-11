import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private readonly _audioContext: AudioContext;
  private _tracks: Map<string, MediaElementAudioSourceNode>;

  private _registerTrack(name: string, filePath: string): void {
    const track = this._audioContext.createMediaElementSource(
      new Audio(filePath)
    );

    track.connect(this._audioContext.destination);
    this._tracks.set(name, track);
  }

  constructor() {
    this._audioContext = new AudioContext();
    this._tracks = new Map<string, MediaElementAudioSourceNode>();

    this._registerTrack('button-click', 'assets/sounds/button-click.wav');
    this._registerTrack('button-reset', 'assets/sounds/button-reset.wav');
  }

  playSound(name: 'button-click' | 'button-reset'): void {
    const track = this._tracks.get(name);

    if (!track) {
      throw new Error(`Track '${name}' not found`);
    }

    if (this._audioContext.state === 'suspended') {
      this._audioContext.resume();
    }

    if (!track.mediaElement.ended) {
      track.mediaElement.pause();
      track.mediaElement.currentTime = 0;
    }

    track.mediaElement.play();
  }
}
