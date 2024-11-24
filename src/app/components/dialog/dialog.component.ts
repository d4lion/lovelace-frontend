import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  @Input() actionSuccessButton!: () => void;
  @Input() actionCancelButton!: () => void;
  @Input() data!: [{}];

  isDialogOpen = false

  handleSuccessButton() {
    this.actionSuccessButton();
  }

  handleCancelButton() {
    this.isDialogOpen = false;
    this.actionCancelButton();
  }
}
