import { Injectable } from '@angular/core';
import { UserData } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _dataKey = 'userData';
  private readonly _defaultData: UserData = {
    highScore: 0,
    total: 0,
    resets: 0,
  };

  getData(): UserData {
    if (!localStorage.getItem(this._dataKey)) {
      localStorage.setItem(this._dataKey, JSON.stringify(this._defaultData));
    }

    return JSON.parse(localStorage.getItem(this._dataKey)!);
  }

  updateData(data: Partial<UserData>) {
    const currentData = this.getData();
    localStorage.setItem(
      this._dataKey,
      JSON.stringify({ ...currentData, ...data })
    );
  }
}
