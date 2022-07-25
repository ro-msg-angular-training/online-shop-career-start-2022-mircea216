import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductOrder } from 'src/order';
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

  checkout(productOrders: ProductOrder[]): Observable<string> {
    if (productOrders.length > 0) {
      const data = { customer: localStorage.getItem('username'), products: productOrders };
      productOrders = [];
      return this.http.post(`${url}/orders`, data, { responseType: 'text' });
    }
    return new Observable<string>();
  }

  updateProduct(product: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`${url}/products/${id}`, product);
  }

  saveProduct(product: any) {
    return this.http.post(`${url}/products`, product);
  }
}


