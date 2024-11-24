import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() frontContent: string = '';
  @Input() backContent: string = '';
  @Input() isSelected: boolean = false;
  
  isFlipped = false;
  

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }


}
