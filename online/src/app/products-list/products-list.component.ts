import { Component, OnInit } from '@angular/core';
import { ProductViewModel } from '../products';
import { AuthentificationService } from '../services/authentification.service';
import { ProductService } from '../services/product.service';
import { customer } from '../utils';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productID: number = -1;
  products: ProductViewModel[] | undefined;
  hasCustomerRole = this.authService.hasRoleType(customer);
  //hasAdminRole = this.authService.hasRoleType(ad)
  constructor(private productService: ProductService, private authService: AuthentificationService) { }


  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  addToCartHandler(): void {
    this.productService.addToCart(this.productID);
  }

  refreshID(id: number) {
    this.productID = id;
  }

}
