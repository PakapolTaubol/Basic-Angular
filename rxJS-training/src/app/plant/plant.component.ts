import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrl: './plant.component.css'
})
export class PlantComponent {
  growPlantPromise() {
    return new Promise<number>((resolve, reject) => {
      let i = 0;
      const intervalIndex = setInterval(() => {
        i++
        if (i === 3) {
          resolve(100);
          clearInterval(intervalIndex);
        }
      }, 1000);
    });
  }
}
