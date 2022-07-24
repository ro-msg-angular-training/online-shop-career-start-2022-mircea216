import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../products';
import { take } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Location } from '@angular/common'
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { updateProduct } from '../store/actions/product.actions';
@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss']
})
export class EditProductFormComponent implements OnInit {
  editForm: FormGroup | undefined;
  product: Product | undefined;
  constructor(private productService: ProductService, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private location: Location, private store: Store<AppState>) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.productService.getProductById(id).pipe(take(1)).subscribe((item: Product) => {
      this.product = item;
      this.editForm = this.formBuilder.group({
        name: [this.editForm?.value.name, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        category: [this.product?.category, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        price: [this.product?.price, [Validators.required, Validators.min(0), Validators.max(10000), Validators.pattern("^[1-9][0-9]*$")]],
        image: [this.product?.image, [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
        description: [this.product?.description, [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]]
      });
    });
  }

  updateFieldsOfProduct(): void {
    if (this.product) {
      if (this.editForm?.valid) {
        this.product = {
          id: this.product.id,
          ...this.editForm.value
        }
        if (this.product) {
          this.store.dispatch(updateProduct({ product: this.product, id: this.product.id }));
          alert("You successfully updated your product details")
          this.goBack();
          // this.productService.updateProduct(this.product, this.product.id).subscribe
          //   (() => {
          //     alert("You successfully updated your product details")
          //     this.goBack();
          //   });
        }
      } else {
        alert('Your data is not valid! Retry!')
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
