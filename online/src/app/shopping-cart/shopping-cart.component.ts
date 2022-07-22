import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../products';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  productOrdersViewer: any = [];

  constructor(private productService: ProductService, private location: Location) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.productService.getCartOrders().forEach((productOrder) => {
      this.productService.getProductById(productOrder.productId).subscribe((item) => {
        let product = <Product>item;
        this.productOrdersViewer.push({ product: product, quantity: productOrder.quantity });
      });
    });
  }

  checkoutHandler() {
    this.productService.checkout().subscribe(() => {
      alert('Checkout succesfully done');
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }
}
