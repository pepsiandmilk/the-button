import { Injectable, OnDestroy, inject } from '@angular/core';
import { SettingsService } from './settings.service';
import { Subscription } from 'rxjs';

export type AudioTrackName = 'button-click' | 'button-reset' | 'background';

enum AudioTrackType {
  Sound,
  Music,
}

@Injectable({
  providedIn: 'root',
})
export class AudioService implements OnDestroy {
  private readonly _audioContext: AudioContext;
  private readonly _tracks: Map<string, MediaElementAudioSourceNode>;
  private readonly _sfxGainNode: GainNode;
  private readonly _musicGainNode: GainNode;
  private readonly _settingsService = inject(SettingsService);
  private readonly _settingsSub: Subscription;

  private _registerTrack(
    name: AudioTrackName,
    filePath: string,
    type: AudioTrackType
  ): void {
    const track = this._audioContext.createMediaElementSource(
      new Audio(filePath)
    );

    switch (type) {
      case AudioTrackType.Sound:
        track.connect(this._sfxGainNode);
        break;
      case AudioTrackType.Music:
        track.connect(this._musicGainNode);
        break;
    }

    this._tracks.set(name, track);
  }

  constructor() {
    this._audioContext = new AudioContext();
    this._tracks = new Map<string, MediaElementAudioSourceNode>();
    this._sfxGainNode = this._audioContext.createGain();
    this._musicGainNode = this._audioContext.createGain();

    this._sfxGainNode.connect(this._audioContext.destination);
    this._musicGainNode.connect(this._audioContext.destination);

    this._registerTrack(
      'button-click',
      'assets/sounds/button-click.wav',
      AudioTrackType.Sound
    );
    this._registerTrack(
      'button-reset',
      'assets/sounds/button-reset.wav',
      AudioTrackType.Sound
    );
    this._registerTrack(
      'background',
      'assets/music/background.ogg',
      AudioTrackType.Music
    );

    this._settingsSub = this._settingsService
      .getSettings()
      .subscribe((settings) => {
        this._sfxGainNode.gain.value = settings.sfxVolume;
        this._musicGainNode.gain.value = settings.musicVolume;
      });
  }

  ngOnDestroy(): void {
    this._settingsSub.unsubscribe();
  }

  playTrack(name: AudioTrackName, loop = false): void {
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

    track.mediaElement.loop = loop;
    track.mediaElement.play();
  }
}
