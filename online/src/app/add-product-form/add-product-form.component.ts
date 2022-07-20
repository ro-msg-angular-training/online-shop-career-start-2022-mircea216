import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      id: 0,
      name: "",
      category: "",
      image: "",
      price: 0,
      description: ""
    });
    this.addForm.valueChanges.subscribe();
  }

  insertProduct(): void {
    const product = {
      id: this.addForm?.value.id,
      name: this.addForm?.value.name,
      category: this.addForm?.value.category,
      image: this.addForm?.value.image,
      price: this.addForm?.value.price,
      description: this.addForm?.value.description
    };
    this.procuctService.saveProduct(product).subscribe(() => {
      alert("Product successfully added");
      this.goBack();
    });
  }

  goBack() {
    this.location.back();
  }
}
