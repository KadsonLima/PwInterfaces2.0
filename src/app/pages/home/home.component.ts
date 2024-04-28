import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatGridListModule, PanelModule, AvatarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
  }

  
}