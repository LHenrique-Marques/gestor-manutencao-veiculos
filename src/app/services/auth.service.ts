import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios';
  private tokenKey = 'auth_token';
  private userKey = 'user_data';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<boolean> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        const user = users[0];
        if (user && user.senha === senha) {
          const fakeToken = btoa(`${user.email}:${user.senha}`);
          localStorage.setItem(this.tokenKey, fakeToken);
          localStorage.setItem(this.userKey, JSON.stringify(user));
          return true;
        }
        throw new Error('Credenciais inválidas');
      }),
      catchError(() => throwError(() => new Error('Erro no login')))
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUser(): Usuario | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }
}
