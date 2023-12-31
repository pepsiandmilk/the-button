import { Injectable } from '@angular/core';
import { Settings } from './settings.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly _defaultSettings: Settings = {
    showMax: true,
    showTotal: true,
    showResets: true,
    musicVolume: 0.5,
    sfxVolume: 1.0,
  };

  private readonly _settingsKey = 'settings';
  private readonly _settings = new BehaviorSubject<Readonly<Settings>>(
    this._defaultSettings
  );

  constructor() {
    if (!localStorage.getItem(this._settingsKey)) {
      localStorage.setItem(
        this._settingsKey,
        JSON.stringify(this._defaultSettings)
      );
    }

    this._settings.next(JSON.parse(localStorage.getItem(this._settingsKey)!));
  }

  getSettings(): Observable<Readonly<Settings>> {
    return this._settings.asObservable();
  }

  updateSettings(settings: Partial<Settings>): void {
    const currentSettings = this._settings.getValue();
    const updatedSettings = { ...currentSettings, ...settings };

    localStorage.setItem(this._settingsKey, JSON.stringify(updatedSettings));

    this._settings.next(updatedSettings);
  }

  resetSettings(): void {
    localStorage.setItem(
      this._settingsKey,
      JSON.stringify(this._defaultSettings)
    );

    this._settings.next(this._defaultSettings);
  }
}
