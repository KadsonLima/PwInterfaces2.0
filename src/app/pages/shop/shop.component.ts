// src/app/product-list/product-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { RequestService } from '../../services/request.service';
import { API_URL } from '../../../globals';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  imports:[FormsModule, CommonModule, MatOptionModule, MatSelectModule, MatInputModule, MatProgressSpinnerModule],
  standalone:true,
})
export class ShopComponent implements OnInit {
  products:Produto[] = [];
  filteredProducts:Produto[] = [];
  filterType: string = '';
  isLoading = false;

  constructor(
    private productService: ProductService,
    public requestService:RequestService,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.requestService.get(API_URL+"?route=produtos").subscribe({
      next:(response) => {
        this.products = response;
        console.log(response)
      this.filteredProducts = response;

      },complete:()=>{
        this.isLoading = false;
      }
    })

  }

  filterProducts() {
    if (this.filterType) {
      this.filteredProducts = this.products.filter(product => product.versao === this.filterType);
    } else {
      this.filteredProducts = this.products;
    }
  }

  viewProduct(product: any) {
    this.router.navigate(['/interface'],  { state: { product } });
  }
}

export interface Produto{
  nome:string,
  preco:number,
  versao:string,
  image:string,
  images:string,
}