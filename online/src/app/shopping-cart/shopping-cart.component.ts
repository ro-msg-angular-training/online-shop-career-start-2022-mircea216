import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../products';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { ordersSelector } from '../store/selectors/cart.selectors';
import { take } from 'rxjs';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products: any = [];
  productOrdersViewer: any = [];
  addedProduct: Product | undefined;
  orders$ = this.store.select(ordersSelector);


  constructor(private productService: ProductService, private location: Location,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(ordersSelector).pipe(take(1))
      .subscribe((data) => this.productOrdersViewer = data);
    this.getOrders();
  }

  getOrders(): void {
    for (let product of this.productOrdersViewer) {
      console.log(product.productId);
      let name = '';
      this.productService.getProductById(product.productId).subscribe((item) => {
        this.addedProduct = item
        this.products.push({ name: this.addedProduct.name, quantity: product.quantity })
      });
    }
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
