import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { AuthGuard } from './auth/auth.guard';
import { EditProductFormComponent } from './edit-product-form/edit-product-form.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [{
      path: 'products', component: ProductsListComponent,
    },
    { path: 'product/:id', component: ProductDetailsComponent },
    {
      path: 'shopping-cart', component: ShoppingCartComponent
    },
    {
      path: 'edit-product/:id', component: EditProductFormComponent
    },
    {
      path: 'add-product-form', component: AddProductFormComponent
    },
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', component: LoginViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
