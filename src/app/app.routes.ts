import { Routes } from "@angular/router";
import { NotFoundComponent } from "./pages/NotFound/NotFound.component";
import { HomeComponent } from "./pages/home/home.component";
import { ServiceComponent } from "./pages/service/service.component";
import { GalleryComponent } from "./pages/gallery/gallery.component";
import { ShopComponent } from "./pages/shop/shop.component";
import { PagamentoComponent } from "./pages/pagamentos/pagamentos.component";
import { CreateProductComponent } from "./pages/create-product/create-product.component";

export const routes: Routes = [

  {
    path: "",
    loadComponent: () =>
      import("./components/main/main.component").then((c) => c.MainComponent),
    children: [
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
      {
        path: "criarProduto",
        component:CreateProductComponent
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
