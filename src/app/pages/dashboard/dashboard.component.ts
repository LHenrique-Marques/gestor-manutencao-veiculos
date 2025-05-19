import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { VeiculoService } from '../../services/veiculo.service';
import { ManutencaoService } from '../../services/manutencao.service';
import { Veiculo } from '../../models/veiculo.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
  MatFormFieldModule,
  MatSelectModule,
  CommonModule,
  RouterModule,
  FormsModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatIconModule
]
,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  usuario: any;
  veiculos: Veiculo[] = [];
  veiculoSelecionadoId: string | null = null;
  alertas: string[] = [];
  mostrarSelecao: boolean = false;

  irParaManutencao() {
    if (this.veiculoSelecionadoId) {
      this.router.navigate([`/manutencoes/${this.veiculoSelecionadoId}`]);
    }
  }

  constructor(
    
    public authService: AuthService,
    private veiculoService: VeiculoService,
    private manutencaoService: ManutencaoService,
    private router: Router
  ) {}

  ngOnInit() {
    
    const user = this.authService.getUser();
    if (!user) return;

    this.usuario = user;

    this.veiculoService.getByUsuarioId(user.id).subscribe(veiculos => {
      this.veiculos = veiculos;
      if (veiculos.length > 0) {
        this.veiculoSelecionadoId = veiculos[0].id;
      }

      veiculos.forEach(veiculo => {
        this.manutencaoService.getByVeiculoId(veiculo.id).subscribe(manutencoes => {
          if (manutencoes.length === 0) {
            this.alertas.push(`O veículo "${veiculo.modelo}" nunca teve manutenção registrada.`);
            return;
          }

          const ult = manutencoes.sort((a, b) => b.data.localeCompare(a.data))[0];
          const dias = this.diasDesde(ult.data);
          if (dias > 180) {
            this.alertas.push(`O veículo "${veiculo.modelo}" está há mais de 6 meses sem manutenção!`);
          }
        });
      });
    });
  }

  diasDesde(data: string): number {
    const hoje = new Date();
    const dataManutencao = new Date(data);
    const diff = hoje.getTime() - dataManutencao.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
