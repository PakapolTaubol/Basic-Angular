import { Component, ViewChild, ElementRef } from "@angular/core";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrl: './plant.component.css'
})
export class PlantComponent {
  @ViewChild('plantImage') plantImage: any;

  promiseBtn() {
    this.resetImg();
    this.growPlantPromise().then((value) => {
      this.plantImage.nativeElement.style.height = `${value + 80}%`;
      this.plantImage.nativeElement.style.width = `${value + 80}%`;
    })
  }

  growPlantPromise() {
    return new Promise<number>((resolve, reject) => {
      let i = 0;
      const intervalIndex = setInterval(() => {
        i++
        if (i === 1) {
          console.log('1');
          resolve(0);
        }
        if (i === 2) {
          console.log('2');
          resolve(50);
        }
        if (i === 3) {
          console.log('3');
          resolve(100);
          clearInterval(intervalIndex);
        }
      }, 1000);
    });
  }

  observableBtn() {
    this.resetImg();
    this.growPlantObservable().subscribe((value) => {
      this.plantImage.nativeElement.style.height = `${value + 80}%`;
      this.plantImage.nativeElement.style.width = `${value + 80}%`;
    })
  }

  growPlantObservable() {
    return new Observable<number>(subscriber => {
      let i = 0;
      setInterval(() => {
        i++
        if (i === 1) {
          console.log('1');
          subscriber.next(0);
        }
        if (i === 2) {
          console.log('2');
          subscriber.next(30);
        }
        if (i === 3) {
          console.log('3');
          subscriber.next(60);
          subscriber.complete();
        }
      }, 500);
    })
  }

  resetImg() {
    this.plantImage.nativeElement.style.height = `0%`;
    this.plantImage.nativeElement.style.width = `0%`;
  }
}