import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product, ProductViewModel } from '../products';
import { Location } from '@angular/common';
import { ProductService } from '../services/product.service';
import { AuthentificationService } from '../services/authentification.service';
import { admin } from '../utils';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  products: ProductViewModel[] | undefined;
  hasAdminRole = this.authService.hasRoleType(admin);

  constructor(private productService: ProductService, private location: Location, private route: ActivatedRoute, private authService: AuthentificationService) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getProductById(id).subscribe((item: Product) => this.product = item);
  }

  getProductById(id: number): Observable<Product> {
    return this.productService.getProductById(id);
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.productService.getProducts().subscribe((products) => {
        this.products = products;
        alert(`The product with ID ${id} has been successfully deleted`);
        this.goBack();
      });
    });
  }

  goBack(): void {
    this.location.back();
  }
}
