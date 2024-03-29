import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { ordersSelector } from '../store/selectors/cart.selectors';
import { take } from 'rxjs';
import { ProductContentCart, ProductOrder } from 'src/order';
import { getProduct } from '../store/actions/product.actions';
import { productSelectorById, selectOneProduct } from '../store/selectors/product.selectors';
import { checkoutRequest } from '../store/actions/cart.actions';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products: ProductOrder[] = [];
  productOrdersViewer: ProductOrder[] = [];
  content: ProductContentCart[] = [];
  addedProduct: Product | undefined;
  orders$ = this.store.select(ordersSelector);
  selectedProduct$ = this.store.select(selectOneProduct);

  constructor(private location: Location,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(ordersSelector).pipe(take(1))
      .subscribe((data) => this.productOrdersViewer = data);
    this.getOrders();
  }

  getOrders(): void {
    for (let product of this.productOrdersViewer) {
      this.store.select(productSelectorById(product.productId)).pipe(take(1)).subscribe((item) => {
        this.addedProduct = item;
        if (this.addedProduct) {
          const productOrder: ProductOrder = { productId: this.addedProduct.id, quantity: product.quantity };
          this.products.push(productOrder);
          const productContentCart: ProductContentCart = { name: this.addedProduct.name, quantity: product.quantity };
          this.content.push(productContentCart);
        }
      });

    }
  }

  checkoutHandler() {
    this.store.dispatch(checkoutRequest({ productOrder: this.products }));
    this.products = [];
    alert('Checkout succesfully done');
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
