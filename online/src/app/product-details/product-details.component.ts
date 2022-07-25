import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductViewModel } from '../products';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { getProduct, removeProduct } from '../store/actions/product.actions';
import { selectOneProduct } from '../store/selectors/product.selectors';
import { adminRoleSelector } from '../store/selectors/auth.selectors';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id: number | undefined;
  products: ProductViewModel[] | undefined;
  roleSelector = this.store.select(adminRoleSelector);
  hasAdminRole: boolean | undefined;
  product: Product | undefined;
  selectedProduct$ = this.store.select(selectOneProduct);


  constructor(private location: Location,
    private route: ActivatedRoute,
    private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.store.dispatch(getProduct({ id: this.id }));
    }
    this.roleSelector.subscribe((role) => { this.hasAdminRole = role });
  }

  deleteProduct(): void {
    if (this.id) {
      this.store.dispatch(removeProduct({ id: this.id }))
      alert(`The product with ID ${this.id} has been successfully deleted`);
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
