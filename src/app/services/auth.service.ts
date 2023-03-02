import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { User } from '../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl = 'http://127.0.0.1:8000/api/user/registro';
  // private apiUrl2 = 'http://127.0.0.1:8000/api/user';
  // private apiUrl3 = 'http://127.0.0.1:8000/api';
  // private apiUpdate = 'http://127.0.0.1:8000/api/user/update/status';
  // private Urole = 'http://127.0.0.1:8000/api/user/update/role';
  // private baseUrl='http://127.0.0.1:8000/api/user/update'
  // private token: string | null = null;
  // private role: string | null = null;

  
  private apiUrl = 'http://127.0.0.1:8000/api/user/registro';
  private apiUrl2 = 'http://127.0.0.1:8000/api/user';
  private apiUrl3 = 'http://127.0.0.1:8000/api';
  private apiUpdate = 'http://127.0.0.1:8000/api/user/update/status';
  private Urole = 'http://127.0.0.1:8000/api/user/update/role';
  private baseUrl='http://127.0.0.1:8000/api/user/update'
  private token: string | null = null;
  private role: string | null = null;
  
  isValid(): boolean {
    const token = localStorage.getItem('token');
    return true;
  }

  

  constructor(private http: HttpClient) {
  
   }
   public checkRole(): Observable<any> {
    return this.http.get('/api/user');
  }

 

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  verifyToken(token: string) {
    return this.http.get<boolean>(`${this.apiUrl3}/verifyToken`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  // async getUserRole() {
  //   try {
  //     const response: any = await this.http.get(`http://192.168.123.110:8000/api/usuario/rol`).toPromise();
  //     return response.rol_id;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }
  async getUserRole() {
    try {
      const response: any = await this.http.get('http://127.0.0.1:8000/api/usuario/rol').toPromise();
      return response.rol_id;
    } catch (error) {
      console.log(error);
      return null;
    }
  }



  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol_id');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }
  deleteUser(id: number)
  {
    return this.http.delete('hhttp://127.0.0.1:8000/api/user/delete' + '/' + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  info(id: number)
  {
    return this.http.get<User>(this.apiUrl2 + '/' + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  login(user: User)
  {
      return this.http.post<User>(this.apiUrl, user)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
  getUsers(): Observable<User[]> 
  {
    return this.http.get<User[]>('http://127.0.0.1:8000/api/users')
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

updateUserRoleAndStatus(userId: number, roleId: number, status: boolean): Observable<User> {
  const body = { rol_id: roleId, status: status };
  const url = `${this.baseUrl}/${userId}`;
  const loggedInUserId = localStorage.getItem('id');
  if (loggedInUserId && +loggedInUserId === userId) {
    return throwError(() => alert('No se puede actualizar el propio perfil.'));
  }
  return this.http.put<User>(url, body);
}

  private handleError(error: HttpErrorResponse)
  {
    if (error.status === 0) {
     
      console.error('Ha ocurrido un error:', error.error);
    } else {
     
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Vuelva a intentar más tarde.'));
  }


  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  public getRole() {
    return localStorage.getItem('rol_id');
  }

  setRole(role: string) {
    this.role = role;
  }

  public isAdmin() {
    return this.getRole() === '1';
  }

  public isEditor() {
      return this.getRole() === '2';
  }

  public isViewer() {
      return this.getRole() === '3';
  }
}