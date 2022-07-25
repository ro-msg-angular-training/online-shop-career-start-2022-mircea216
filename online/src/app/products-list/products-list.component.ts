import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductViewModel } from '../products';
import { placeOrder } from '../store/actions/cart.actions';
import { loadProducts } from '../store/actions/product.actions';
import { adminRoleSelector, customerRoleSelector } from '../store/selectors/auth.selectors';
import { selectAllProducts } from '../store/selectors/product.selectors';
import { AppState } from '../store/state/app.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productID: number = -1;
  products: ProductViewModel[] | undefined;
  public allProducts$ = this.store.select(selectAllProducts);

  hasCustomerRole: boolean | undefined;
  hasAdminRole: boolean | undefined;
  adminRoleSelector = this.store.select(adminRoleSelector);
  customerRoleSelector = this.store.select(customerRoleSelector);;


  constructor(private store: Store<AppState>) { }


  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.adminRoleSelector.subscribe((role) => { this.hasAdminRole = role });
    this.customerRoleSelector.subscribe((role) => { this.hasCustomerRole = role });
  }

  addToCartHandler(): void {
    this.store.dispatch(placeOrder({ id: this.productID }))
  }

  refreshID(id: number) {
    this.productID = id;
  }

}
