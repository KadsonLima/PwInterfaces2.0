import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TopbarComponent implements OnInit {
  open: boolean = true;
  @Output() isOpen: EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.open = !this.open;
    this.isOpen.next(this.open);
  }
}
