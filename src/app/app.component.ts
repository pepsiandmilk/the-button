import { Component, OnInit, inject } from '@angular/core';
import { SettingsService } from './settings.service';
import { Settings } from './settings.model';
import { ModalService } from './modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly _settingsService = inject(SettingsService);
  private readonly _modalService = inject(ModalService);
  private _probability = 0;

  score = 0;
  highScore = 0;
  total = 0;
  resets = 0;

  settings$!: Observable<Settings>;

  ngOnInit(): void {
    this.settings$ = this._settingsService.getSettings();
  }

  onClick(): void {
    this._probability++;
    this.total++;

    if (Math.floor(Math.random() * 100) <= this._probability) {
      if (this.score > this.highScore) {
        this.highScore = this.score;
      }

      this.score = 0;
      this._probability = 0;
      this.resets++;
    } else {
      this.score++;
    }
  }

  onShowSettings(): void {
    this._modalService.open('settings');
  }
}
