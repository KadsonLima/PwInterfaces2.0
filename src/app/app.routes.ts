import { Routes } from "@angular/router";
import { NotFoundComponent } from "./pages/NotFound/NotFound.component";
import { HomeComponent } from "./pages/home/home.component";
import { ServiceComponent } from "./pages/service/service.component";
import { GalleryComponent } from "./pages/gallery/gallery.component";
import { ShopComponent } from "./pages/shop/shop.component";
import { PagamentoComponent } from "./pages/pagamentos/pagamentos.component";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "app",
  },
  {
    path: "app",
    loadComponent: () =>
      import("./components/main/main.component").then((c) => c.MainComponent),
    children: [
      {
        path: "",
        redirectTo: "overview",
        pathMatch:'full'
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "service",
        component:ServiceComponent
      },
      {
        path: "galeria",
        component:GalleryComponent
      },
      {
        path: "shop",
        component:ShopComponent
      },
      {
        path: "pagamento",
        component:PagamentoComponent
      },
    ],
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
