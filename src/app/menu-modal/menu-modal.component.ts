import { Component, inject } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss'],
})
export class MenuModalComponent {
  private readonly _audioService = inject(AudioService);

  onClosed() {
    this._audioService.playTrack('background', true);
  }
}
