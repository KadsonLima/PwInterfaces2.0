// src/app/product-list/product-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  imports:[FormsModule, CommonModule],
  standalone:true,
})
export class ShopComponent implements OnInit {
  products:any[] = [];
  filteredProducts:any = [];
  filterType: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

  filterProducts() {
    if (this.filterType) {
      this.filteredProducts = this.products.filter(product => product.type === this.filterType);
    } else {
      this.filteredProducts = this.products;
    }
  }
}
