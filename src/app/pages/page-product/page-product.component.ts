import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Produto } from '../shop/shop.component';
import { PhotoService } from '../../services/photo.service';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-page-product',
  standalone: true,
  imports: [CommonModule, GalleryModule, GalleriaModule],
  templateUrl: './page-product.component.html',
  styleUrl: './page-product.component.scss'
})
export class PageProductComponent implements OnInit {
  images!: any[];
  product!:Produto;

  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  constructor(private route: ActivatedRoute, private photoService:PhotoService) { }

  ngOnInit() {
    this.product = this.product = history.state.product;
    this.images = this.product?.images.split(",").map(item => item);
  }

  buyProduct() {
    alert(`Você comprou: ${this.product.nome} por ${this.product.preco}!`);
  }
}
