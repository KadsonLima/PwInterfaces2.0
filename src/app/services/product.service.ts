// src/app/product.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products = [
    { id: 1, name: 'Product 1', type: 'Type A', price: 10.99, imageUrl: 'assets/product1.jpg' },
    { id: 2, name: 'Product 2', type: 'Type B', price: 15.49, imageUrl: 'assets/product2.jpg' },
    { id: 3, name: 'Product 3', type: 'Type A', price: 7.99, imageUrl: 'assets/product3.jpg' },
    { id: 4, name: 'Product 4', type: 'Type C', price: 20.00, imageUrl: 'assets/product4.jpg' },
  ];

  constructor() { }

  getProducts() {
    return this.products;
  }
}
