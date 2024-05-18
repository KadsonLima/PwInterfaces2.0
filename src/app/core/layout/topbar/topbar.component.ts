import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

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
  constructor(private responsive: BreakpointObserver) { }

  ngOnInit() {
    this.responsive.observe(Breakpoints.Small)
    .subscribe(result => {

      if (result.matches) {
        this.toggle();
      }

    });
  }

  toggle() {
    this.open = !this.open;
    this.isOpen.next(this.open);
  }
}
