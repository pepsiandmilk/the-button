import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input({ required: true }) id!: string;
  private readonly _modalService = inject(ModalService);
  hidden = true;

  ngOnInit(): void {
    this._modalService.register(this);
  }

  open() {
    this.hidden = false;
  }

  close() {
    this.hidden = true;
  }
}
