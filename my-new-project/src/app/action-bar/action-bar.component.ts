import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.scss'
})
export class ActionBarComponent {
  @Input() step: number = 1;
  @Output() numberChange = new EventEmitter();

  num: number = 0;
  incNumber(req: string) {
    switch (req) {
      case "-":
        if (this.num - this.step >= 0) {
          this.num -= this.step
          this.numberChange.emit();
        }
        break;
      case "+":
        if (this.num + this.step <= 100) {
          this.num += this.step
          this.numberChange.emit();
        }
        break;
    }
  }
  assign(count: string) {
    const numCount = Number(count);
    if (numCount < 0 || numCount > 100) {
      this.num = 0;
    } else { this.num = numCount; }

  }
}
