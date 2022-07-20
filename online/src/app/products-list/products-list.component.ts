import { Component, OnInit } from '@angular/core';
import { ProductViewModel } from '../products';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productID: number = -1;
  products: ProductViewModel[] | undefined;

  constructor(private productService: ProductService) { }


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
