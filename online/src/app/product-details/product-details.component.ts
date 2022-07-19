import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product, products, ProductViewModel } from '../products';
import { HttpClient } from "@angular/common/http";
import { url } from '../utils';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  selectedID: number | undefined;
  constructor(private http: HttpClient, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getProductById(id).subscribe((item: Product) => this.product = item);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${url}/products/${id}`);
  }
}
