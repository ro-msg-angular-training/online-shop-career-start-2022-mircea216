import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductViewModel } from '../products';
import { AuthentificationService } from '../services/authentification.service';
import { ProductService } from '../services/product.service';
import { loadProducts } from '../store/actions/product.actions';
import { selectAllProducts } from '../store/selectors/product.selectors';
import { AppState } from '../store/state/app.state';
import { admin, customer } from '../utils';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productID: number = -1;
  products: ProductViewModel[] | undefined;
  public allProducts$ = this.store.select(selectAllProducts);

  hasCustomerRole = this.authService.hasRoleType(customer);
  hasAdminRole = this.authService.hasRoleType(admin);

  constructor(private productService: ProductService, private authService: AuthentificationService, private store:
    Store<AppState>) { }


  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  addToCartHandler(): void {
    this.productService.addToCart(this.productID);
  }

  refreshID(id: number) {
    this.productID = id;
  }

}
