import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterOutlet } from "@angular/router";
import { CustomSidenavComponent } from "../../core/layout/custom-sidenav/custom-sidenav.component";
import { MatMenuModule } from "@angular/material/menu";
import { BreakpointObserver } from "@angular/cdk/layout";
import {Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: "app-main",
  styleUrls: ["./main.component.scss"],
  standalone: true,
  providers: [],
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    CustomSidenavComponent,
    MatMenuModule,
  ],
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z3 flex justify-between" >
      <p>PW Interfaces</p>

      <button mat-icon-button (click)="collapsed.set(!collapsed())">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>
    <mat-sidenav-container>
      <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <app-custom-sidenav [collapsed]="collapsed()"></app-custom-sidenav>
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class MainComponent implements OnInit {
  collapsed = signal<boolean>(false);
  sidenavWidth = computed(() => (this.collapsed() ? "70px" : "200px"));
  constructor(private responsive: BreakpointObserver) { }

  ngOnInit() {
    this.responsive.observe((Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Medium))
      .subscribe(result => {

        if (result.matches) {
          this.collapsed.set(true);
          return;
        }
        this.collapsed.set(false);
  });
  }


}

// https://www.youtube.com/watch?v=sitHfnoeT88
