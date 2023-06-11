import { Injectable, OnDestroy, inject } from '@angular/core';
import { SettingsService } from './settings.service';
import { Subscription } from 'rxjs';

export type AudioTrackName = 'button-click' | 'button-reset';

@Injectable({
  providedIn: 'root',
})
export class AudioService implements OnDestroy {
  private readonly _audioContext: AudioContext;
  private readonly _tracks: Map<string, MediaElementAudioSourceNode>;
  private readonly _sfxGainNode: GainNode;
  private readonly _settingsService = inject(SettingsService);
  private readonly _settingsSub!: Subscription;

  private _registerTrack(name: AudioTrackName, filePath: string): void {
    const track = this._audioContext.createMediaElementSource(
      new Audio(filePath)
    );

    track.connect(this._sfxGainNode);
    this._tracks.set(name, track);
  }

  constructor() {
    this._audioContext = new AudioContext();
    this._tracks = new Map<string, MediaElementAudioSourceNode>();
    this._sfxGainNode = this._audioContext.createGain();

    this._sfxGainNode.connect(this._audioContext.destination);

    this._registerTrack('button-click', 'assets/sounds/button-click.wav');
    this._registerTrack('button-reset', 'assets/sounds/button-reset.wav');

    this._settingsSub = this._settingsService
      .getSettings()
      .subscribe(
        (settings) => (this._sfxGainNode.gain.value = settings.sfxVolume)
      );
  }

  ngOnDestroy(): void {
    this._settingsSub.unsubscribe();
  }

  playSound(name: AudioTrackName): void {
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
