import { Component, OnInit, inject } from '@angular/core';
import { SettingsService } from './settings.service';
import { Settings } from './settings.model';
import { ModalService } from './modal.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { AudioService } from './audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly _settingsService = inject(SettingsService);
  private readonly _userService = inject(UserService);
  private readonly _modalService = inject(ModalService);
  private readonly _audioService = inject(AudioService);
  private _probability = 0;

  score = 0;
  highScore = 0;
  total = 0;
  resets = 0;

  settings$!: Observable<Settings>;

  ngOnInit(): void {
    this.settings$ = this._settingsService.getSettings();

    this.highScore = this._userService.getData().highScore;
    this.total = this._userService.getData().total;
    this.resets = this._userService.getData().resets;

    // hack
    setTimeout(() => this._modalService.open('menu'));
  }

  onClick(): void {
    this._audioService.playTrack('button-click');

    this._probability++;
    this._userService.updateData({ total: ++this.total });

    if (Math.floor(Math.random() * 100) <= this._probability) {
      if (this.score > this.highScore) {
        this.highScore = this.score;
        this._userService.updateData({ highScore: this.highScore });
      }

      this.score = 0;
      this._probability = 0;
      this._userService.updateData({ resets: ++this.resets });
      this._audioService.playTrack('button-reset');
    } else {
      this.score++;
    }
  }

  onShowSettings(): void {
    this._modalService.open('settings');
  }
}
