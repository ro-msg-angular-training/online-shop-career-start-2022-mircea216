import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, ProductOrder } from 'src/order';
import { Product, ProductViewModel } from '../products';
import { url } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productOrders: ProductOrder[] = [];
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

  addToCart(productID: number): void {
    let productOrders = this.productOrders.find(productOrder => productOrder.productId === productID);
    if (productOrders === undefined) {
      this.productOrders.push({ productId: productID, quantity: 1 });
    } else {
      productOrders.quantity += 1;
    }
  }

  getCartOrders(): ProductOrder[] {
    return this.productOrders;
  }

  checkout(): any {
    const data = { customer: 'doej', products: this.productOrders };
    this.productOrders = [];
    return this.http.post(`${url}/orders`, data, { responseType: 'text' });
  }

  updateProduct(product: Product, id: number) {
    return this.http.put(`${url}/products/${id}`, product);
  }
}


