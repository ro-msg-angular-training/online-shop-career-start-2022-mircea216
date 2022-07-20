import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductFormComponent } from './edit-product-form/edit-product-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: 'products', component: ProductsListComponent,
  },
  { path: 'product/:id', component: ProductDetailsComponent },
  {
    path: 'view-cart', component: ShoppingCartComponent
  },
  {
    path: 'edit-product/:id', component: EditProductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
