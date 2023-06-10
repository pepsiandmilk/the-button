import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _probability = 0;
  score = 0;
  highScore = 0;

  onClick(): void {
    this._probability++;

    if (Math.floor(Math.random() * 100) <= this._probability) {
      if (this.score > this.highScore) {
        this.highScore = this.score;
      }

      this.score = 0;
      this._probability = 0;
    } else {
      this.score++;
    }
  }
}
