import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ActionBarComponent } from "../app/action-bar/action-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ActionBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-new-project';
  ninjaName = 'Naruto';

  price = 0;

  ninjaConsole() {
    console.log(`Ninja is ${this.ninjaName}`)
  }
  changeNinjaName(name: string) {
    this.ninjaName = name;
  }
  calBuffet(price: string) {
    const numPrice = Number(price);
    this.price = (numPrice * 3) / 4
  }
}
