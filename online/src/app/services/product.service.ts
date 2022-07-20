import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductViewModel } from '../products';
import { url } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<ProductViewModel[]>(`${url}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${url}/products/${id}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${url}/products/${id}`);
  }

}
