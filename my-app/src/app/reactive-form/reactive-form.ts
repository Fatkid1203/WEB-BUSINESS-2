import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { customValidator, passwordValidator } from '../validators/check.validator';

@Component({
  selector: 'app-reactive-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.html',
  styleUrls: ['./reactive-form.css']
})
export class ReactiveFormComponent {
  regForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.regForm = this._formBuilder.group({
      name: ['Huỳnh Tấn Phát', [Validators.required, Validators.minLength(3), customValidator(/\@|\#|\$|\%|\^|\&/g)]],
      email: ['Phatht234111e@st.uel.edu.vn'],
      password: [''],
      confirmPass: ['']
    }, { validators: [passwordValidator] });
  }

  get name() {
    return this.regForm.controls['name'];
  }

  setDefaultValues(): void {
    this.regForm.patchValue({
      name: 'Huỳnh Tấn Phát',
      email: 'Phatht234111e@st.uel.edu.vn',
      password: '',
      confirmPass: ''
    });
  }

  onSubmit(): void {
    console.log('Reactive Form submitted:', this.regForm.value);
  }
}
