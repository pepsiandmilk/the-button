import { Injectable } from '@angular/core';
import { Settings } from './settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly _defaultSettings: Settings = {
    showMax: true,
    showTotal: false,
    showResets: false,
    musicVolume: 0.5,
    sfxVolume: 0.5,
  };

  private readonly _settingsKey = 'settings';

  getSettings(): Settings {
    if (!localStorage.getItem(this._settingsKey)) {
      localStorage.setItem(
        this._settingsKey,
        JSON.stringify(this._defaultSettings)
      );
    }

    return JSON.parse(localStorage.getItem(this._settingsKey)!);
  }

  updateSettings(settings: Partial<Settings>): void {
    localStorage.setItem(
      this._settingsKey,
      JSON.stringify({ ...this.getSettings(), ...settings })
    );
  }

  resetSettings(): void {
    localStorage.setItem(
      this._settingsKey,
      JSON.stringify(this._defaultSettings)
    );
  }
}
