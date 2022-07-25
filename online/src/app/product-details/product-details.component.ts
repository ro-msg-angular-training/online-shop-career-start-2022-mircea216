import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductViewModel } from '../products';
import { Location } from '@angular/common';
import { ProductService } from '../services/product.service';
import { AuthentificationService } from '../services/authentification.service';
import { admin } from '../utils';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { getProduct, removeProduct } from '../store/actions/product.actions';
import { selectOneProduct } from '../store/selectors/product.selectors';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id: number | undefined;
  products: ProductViewModel[] | undefined;
  item = this.store.select(selectOneProduct);
  hasAdminRole = this.authService.hasRoleType(admin);
  subscriptionOfProduct: Subscription | undefined;
  product: Product | undefined;


  constructor(private productService: ProductService, private location: Location,
    private route: ActivatedRoute, private authService: AuthentificationService,
    private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getProductById(this.id).subscribe((item: Product) => this.product = item);
      this.store.dispatch(getProduct({ id: this.id }))
      this.subscriptionOfProduct = this.store.select(selectOneProduct).subscribe((data) => {
        this.product = data;
      }
      );
    }
  }

  getProductById(id: number): Observable<Product> {
    return this.productService.getProductById(id);
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
