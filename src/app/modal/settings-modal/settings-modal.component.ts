import { Component, OnInit, inject } from '@angular/core';
import { Settings } from 'src/app/settings.model';
import { SettingsService } from 'src/app/settings.service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent implements OnInit {
  private readonly _settingsService = inject(SettingsService);
  settings!: Settings;

  ngOnInit(): void {
    this.settings = this._settingsService.getSettings();
  }

  onChange(): void {
    this._settingsService.updateSettings(this.settings);
  }
}
