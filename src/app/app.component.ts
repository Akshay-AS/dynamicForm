import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, UntypedFormBuilder, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reactiveForm';

  formFields: any = [];
  form = new FormGroup({});

  constructor(private formBuilder: UntypedFormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<any[]>('/assets/sample.json').subscribe((formFields: any[]) => {
      for (const formField of formFields) {
        this.form.addControl(formField.name, new FormControl('', this.getValidator(formField)));
      }
      this.formFields = formFields;
    });
  }

  private getValidator(formField: any):ValidatorFn[] {

    let valList : ValidatorFn[]=[];

    for (const val of formField.validation) {

      switch (val) {
        case 'email':
          valList.push(Validators.email);

          break;
        case 'required':
          valList.push(Validators.required);
          break;
      }
    }

    
    return valList;

  }

  onSubmit() {
    console.log(this.form.value);

  }

}
