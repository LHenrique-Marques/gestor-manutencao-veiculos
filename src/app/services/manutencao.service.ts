import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Manutencao } from '../models/manutencao.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {
  private apiUrl = 'http://localhost:3000/manutencoes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Manutencao[]> {
    return this.http.get<Manutencao[]>(this.apiUrl);
  }

  getById(id: number): Observable<Manutencao> {
    return this.http.get<Manutencao>(`${this.apiUrl}/${id}`);
  }

  getByVeiculoId(veiculoId: string): Observable<Manutencao[]> {
  return this.http.get<Manutencao[]>(`${this.apiUrl}?veiculoId=${veiculoId}`);
  }

  create(manutencao: Manutencao): Observable<Manutencao> {
    return this.http.post<Manutencao>(this.apiUrl, manutencao);
  }

  update(id: number, manutencao: Manutencao): Observable<Manutencao> {
    return this.http.put<Manutencao>(`${this.apiUrl}/${id}`, manutencao);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
