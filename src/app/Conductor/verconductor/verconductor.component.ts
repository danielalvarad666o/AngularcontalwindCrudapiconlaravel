import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verconductor',
  templateUrl: './verconductor.component.html',
  styleUrls: ['./verconductor.component.css']
})
export class VerconductorComponent {
  conductor: any[] = [];
  constructor( private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getConductores();
  }
  getConductores() {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };

    const url1 = 'http://127.0.0.1:8000/api/conductoryordi';
    this.http.get(url1, httpOptions).subscribe(
      (response: any) => {
        console.log(response[0]);

        this.conductor = response[0];

        console.log(this.conductor);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  borrarConductor(id: number) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };

    const url = `http://127.0.0.1:8000/api/conductoryordi/borrar/${id}`;
    this.http.delete(url, httpOptions).subscribe(
      (response) => {
        console.log(response);
        this.getConductores(); // Actualiza la tabla después de eliminar el conductor
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
