import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent implements OnInit {
  addForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder, private procuctService: ProductService, private location: Location) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      image: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10000)]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(10000), Validators.pattern("^[1-9][0-9]*$")]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(10000)]]
    });
  }

  insertProduct(): void {
    const product = {
      name: this.addForm?.value.name,
      category: this.addForm?.value.category,
      image: this.addForm?.value.image,
      price: this.addForm?.value.price,
      description: this.addForm?.value.description
    };
    if (this.addForm?.valid) {
      this.procuctService.saveProduct(product).subscribe(() => {
        alert("Product successfully added!");
        this.goBack();
      });
    } else {
      alert('Your data is not valid! Retry!');
    }
  }

  goBack() {
    this.location.back();
  }
}
