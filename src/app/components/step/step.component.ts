import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.css',
})
export class StepComponent {
  @Input() label: string | number = '';
  @Input() isActive: boolean = false;
  @Input() isCompleted: boolean = false;
}
