import { Pipe, PipeTransform } from '@angular/core';
import { Manutencao } from '../models/manutencao.model';

@Pipe({
  name: 'filtroServico',
  standalone: true
})
export class FiltroServicoPipe implements PipeTransform {
  transform(manutencoes: Manutencao[], termo: string): Manutencao[] {
    if (!termo) return manutencoes;
    termo = termo.toLowerCase();
    return manutencoes.filter(m => m.servico.toLowerCase().includes(termo));
  }
}
