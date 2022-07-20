import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { ProductViewModel } from '../products';
import { url } from '../utils';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: ProductViewModel[] | undefined;

  constructor(private productService: ProductService) { }


  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

}
