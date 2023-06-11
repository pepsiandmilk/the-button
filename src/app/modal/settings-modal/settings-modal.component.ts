import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Settings } from 'src/app/settings.model';
import { SettingsService } from 'src/app/settings.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent implements OnInit, OnDestroy {
  private readonly _settingsService = inject(SettingsService);
  private _settingsSub!: Subscription;
  settings!: Settings;

  ngOnInit(): void {
    this._settingsSub = this._settingsService
      .getSettings()
      .subscribe((settings) => (this.settings = settings));
  }

  ngOnDestroy(): void {
    this._settingsSub.unsubscribe();
  }

  onChange(): void {
    this._settingsService.updateSettings(this.settings);
  }
}
