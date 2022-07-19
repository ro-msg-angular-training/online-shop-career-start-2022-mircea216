import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product, products } from '../products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  productsList = products;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductById(id).subscribe(product => this.product = product);

  }

  getProductById(id: number): Observable<Product> {
    const product = this.productsList.find(item => item.id === id)!;
    return of(product);
  }
}
