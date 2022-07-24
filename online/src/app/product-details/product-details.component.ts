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
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id: number | undefined;
  product: Product | undefined;
  products: ProductViewModel[] | undefined;
  item = this.store.select(selectOneProduct);
  hasAdminRole = this.authService.hasRoleType(admin);

  constructor(private productService: ProductService, private location: Location,
    private route: ActivatedRoute, private authService: AuthentificationService,
    private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // const item = this.store.select(selectOneProduct);
    // if (this.id) {
    //   this.store.dispatch(getProduct({ id: this.id }));
    //   /// console.log(this.item);
    //   /// item.pipe().subscribe((p) => this.product = p);
    //   item.subscribe((p) => { this.product = p });
    //   // this.clickedProduct$.subscribe((item) => {
    //   //   console.log(item);
    //   //   this.product = item;
    //   // });
    //   //console.log(this.clickedProduct$);
    //   console.log(this.product);
    //   console.log(this.id);
    // }
    // console.log(this.clickedProduct$);
    // console.log("*");
    // if (this.id) {
    //   this.store.dispatch(getProduct({ id: this.id }));
    //   /// console.log(this.clickedProduct$);
    //   this.clickedProduct$.subscribe((item) => {
    //     console.log('***');
    //     this.product = item;
    //   });
    //   //console.log(this.product);
    // }
    if (this.id)
      this.getProductById(this.id).subscribe((item: Product) => this.product = item);
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
