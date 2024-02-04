import { Component } from '@angular/core';
import { StoreService } from '../store/store.service';

@Component({
  selector: 'app-limit-offset',
  templateUrl: './limit-offset.component.html',
  styleUrl: './limit-offset.component.css'
})
export class LimitOffsetComponent {
  title = 'Limit Offset'

  constructor(public store: StoreService) {''
  }
}
