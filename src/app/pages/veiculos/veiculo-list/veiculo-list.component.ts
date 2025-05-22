import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { VeiculoService } from '../../../services/veiculo.service';
import { AuthService } from '../../../services/auth.service';
import { Veiculo } from '../../../models/veiculo.model';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ManutencaoService } from '../../../services/manutencao.service';

@Component({
  selector: 'app-veiculo-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './veiculo-list.component.html',
  styleUrl: './veiculo-list.component.css',
})
export class VeiculoListComponent {
  veiculos: Veiculo[] = [];
  termoBusca: string = '';

  constructor(
    public veiculoService: VeiculoService,
    public authService: AuthService,
    public router: Router,
    public manutencaoService: ManutencaoService
  ) {}

  ngOnInit() {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {
    const user = this.authService.getUser();
    if (user) {
      this.veiculoService.getByUsuarioId(user.id).subscribe(data => {
        this.veiculos = data;
      });
    }
  }

  get veiculosFiltrados(): Veiculo[] {
    if (!this.termoBusca.trim()) return this.veiculos;
    const termo = this.termoBusca.toLowerCase();
    return this.veiculos.filter(v =>
      v.placa.toLowerCase().includes(termo) ||
      v.modelo.toLowerCase().includes(termo) ||
      v.marca.toLowerCase().includes(termo)
    );
  }

  excluir(veiculoId: string): void {
    if (confirm('Deseja realmente excluir este veículo?')) {
      this.manutencaoService.getByVeiculoId(veiculoId).subscribe(manutencoes => {
        if (manutencoes.length > 0) {
          const deletarManutencoes = manutencoes.map(manutencao =>
            this.manutencaoService.delete(manutencao.id).toPromise()
          );

          Promise.all(deletarManutencoes)
            .then(() => {
              this.veiculoService.delete(veiculoId).subscribe(() => {
                alert('Veículo e manutenções excluídos com sucesso!');
                this.carregarVeiculos();
              });
            })
            .catch(() => {
              alert('Erro ao deletar manutenções.');
            });
        } else {
          this.veiculoService.delete(veiculoId).subscribe(() => {
            alert('Veículo excluído com sucesso!');
            this.carregarVeiculos();
          });
        }
      });
    }
  }
}
