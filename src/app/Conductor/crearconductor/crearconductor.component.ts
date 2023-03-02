import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearconductor',
  templateUrl: './crearconductor.component.html',
  styleUrls: ['./crearconductor.component.css']
})
export class CrearconductorComponent {


  conductorForm!: FormGroup ;
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }
  
    ngOnInit(): void {
      this.conductorForm = this.formBuilder.group({
        A_paterno: ['', [Validators.required,Validators.minLength(2)]],
        edad: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        nombre: ['',[Validators.required,Validators.minLength(2)]],
        A_materno:['',[Validators.required,Validators.minLength(2)]],

       
      });
    }
      onSubmit() {
        const token = localStorage.getItem('token');
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        };
        const url = 'http://127.0.0.1:8000/api/conductor/crearyordi';
    
        if (this.conductorForm.valid) {
          this.http.post(url, this.conductorForm.value, httpOptions).subscribe(
            (response) => {
              console.log(response);
              
              
                
                this.router.navigate(['/conductor-info']);
              
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          console.log('El formulario no es válido');
        }
      }
}
