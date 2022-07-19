import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Product, products, ProductViewModel } from '../products';
import { url } from '../utils';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Observable<ProductViewModel[]> | undefined;

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.products = this.getProducts();
  }

  getProducts() {
    return this.http.get<ProductViewModel[]>(`${url}/products`);
  }
}
