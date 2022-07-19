import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Product, products, ProductViewModel } from '../products';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  //products = products;
  //product: Product = { id: 0, name: "", category: "", price: 0, description: "", image: "" };
  //(private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   //this.product.id = <number><unknown>this.route.snapshot.paramMap.get('id');
  // }

  // readonly URL = 'http://localhost:3000/products';

  products: Observable<ProductViewModel[]> | undefined;

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.products = this.http.get<ProductViewModel[]>('http://localhost:3000/products');
  }

}
