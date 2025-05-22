import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Veiculo } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';
  private veiculosUrl = 'http://localhost:3000/veiculos';

  constructor(private http: HttpClient) {}
  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }
  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  getVeiculosByUsuarioId(usuarioId: string): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.veiculosUrl}?usuarioId=${usuarioId}`);
  }
  getById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }
  transferirVeiculo(veiculoId: string, veiculoAtualizado: Veiculo): Observable<Veiculo> {
  return this.http.put<Veiculo>(`${this.veiculosUrl}/${veiculoId}`, veiculoAtualizado);
}
}
