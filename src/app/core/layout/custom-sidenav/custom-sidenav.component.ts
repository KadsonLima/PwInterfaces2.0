import { Component, Input, computed, inject, signal } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
export type MenuItem = {
  icon: string;
  label: string;
  routerLink: string[];
};

@Component({
  selector: "app-custom-sidenav",
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    NgClass,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
  ],
  template: `
    <div class="flex flex-1 h-full justify-between flex-col ">
      <div>
        <div
          class="sidenav-header flex flex-col gap-2 items-center justify-center"
        >
          <img
            [width]="profilePicSize()"
            [height]="profilePicSize()"
            src="assets/light.png"
            alt="wedding plan logo"
          />
          <div
            class="header-text"
            [class.hide-header-text]="sideNavCollapsed()"
          >
          </div>
        </div>
        <mat-nav-list class="w-full">
          @for (menuItem of menuItems(); track menuItem.routerLink) {
          <a
            mat-list-item
            class="w-full menu-item"
            [routerLink]="menuItem.routerLink"
            routerLinkActive="selected-menu-item"
            #rla="routerLinkActive"
            [activated]="rla.isActive"
          >
            <mat-icon
              [fontSet]="
                rla.isActive ? 'material-icons' : 'material-icons-outlined'
              "
              matListItemIcon
              >{{ menuItem.icon }}</mat-icon
            >
            @if(!sideNavCollapsed()){
            <span>{{ menuItem.label }}</span>
            }
          </a>
          }
        </mat-nav-list>
      </div>
      <p
        class="m-0 text-center text-gray-500 text-sm mb-4"
        [class.text-xs]="sideNavCollapsed()"
      >
        V. 1.0
      </p>
    </div>
  `,
  styles: [
    `
      @import "../../../../assets/styles/custom-theme.scss";

      :host * {
        transition: all 100ms ease-in-out;
      }
      .sidenav-header {
        padding-top: 24px;

        > img {
          // border-radius:100%;
          object-fit: cover;
        }

        .header-text {
          > h2 {
            margin: 0;
            font-size: 1.1rem;
            font-weight: 500;
            line-height: 1.5rem;
          }
        }

        .hide-header-text {
          opacity: 0;
          height: 0 !important;
        }
      }

      .menu-item {
        border-left: 5px solid;
        border-left-color: transparent;
      }

      .selected-menu-item {
        border-left-color: $primary;
        background: rgba(0, 0, 0, 0.05);
      }

      .mdc-list-item--with-leading-icon .mdc-list-item__start{
        margin-inline-end: 22px;
      }
    `,
  ],
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false);
  profilePicSize = computed(() => (this.sideNavCollapsed() ? "32" : "100"));
  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  menuItems = signal<MenuItem[]>([
    { icon: "home", label: "Home", routerLink: ["home"] },
    {
      icon: "design_services",
      label: "Serviço",
      routerLink: ["service"],
    },
    { icon: "dashboard", label: "Galeria", routerLink: ["galeria"] },
    { icon: "shopping_cart", label: "Loja", routerLink: ["shop"] },
    { icon: "price_check", label: "Pagamento", routerLink: ["pagamento"] },
  ]);
}
