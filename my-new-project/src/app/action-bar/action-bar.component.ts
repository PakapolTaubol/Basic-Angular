import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.scss'
})
export class ActionBarComponent {
  num = 0;
  incNumber(req: string) {
    switch (req) {
      case "-":
        if (this.num !== 0) {
          this.num--
        }else {
          alert("Its cant be negative")
        }
        break;
      case "+":
        this.num++
        break;
    }
  }
}
