import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../products';
import { ProductService } from '../services/product.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss']
})
export class EditProductFormComponent implements OnInit {
  editForm: FormGroup | undefined;
  product: Product | undefined;
  constructor(private productService: ProductService, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private location: Location) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.productService.getProductById(id).subscribe((item: Product) => {
      this.product = item
      this.editForm = this.formBuilder.group({
        name: this.product?.name,
        category: this.product?.category,
        price: this.product?.price,
        image: this.product?.image,
        description: this.product?.description
      });
      this.editForm.valueChanges.subscribe(console.log);
    });
  }

  updateFieldsOfProduct() {
    if (this.product)
      this.product = {
        id: this.product.id,
        name: this.editForm?.value.name,
        category: this.editForm?.value.category,
        image: this.editForm?.value.image,
        price: this.editForm?.value.price,
        description: this.editForm?.value.description,
      }
    if (this.product) {
      this.productService.updateProduct(this.product, this.product.id).subscribe
        (() => {
          alert("You successfully updated your product details")
          this.goBack();
        });
    }
  }

  goBack() {
    this.location.back();
  }
}
