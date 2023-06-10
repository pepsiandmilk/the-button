import { Injectable } from '@angular/core';
import { ModalComponent } from './modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _modals: ModalComponent[] = [];

  register(modal: ModalComponent): void {
    if (this._modals.find((m) => m.id === modal.id)) {
      throw new Error('modal must have a unique id');
    }

    this._modals.push(modal);
  }

  open(id: string) {
    const modal = this._modals.find((m) => m.id === id);

    if (!modal) {
      throw new Error(`modal '${id} does not exist'`);
    }

    modal.open();
  }

  close() {
    this._modals.find((m) => !m.hidden)?.close();
  }
}
