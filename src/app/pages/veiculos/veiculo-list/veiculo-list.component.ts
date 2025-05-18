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
  MatIconModule
]
,
  templateUrl: './veiculo-list.component.html',
  styleUrl: './veiculo-list.component.css'
})
export class VeiculoListComponent {
  veiculos: Veiculo[] = [];
  termoBusca: string = ''; 

  constructor(
    public veiculoService: VeiculoService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
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

  excluir(id: string) {
    this.veiculoService.delete(id).subscribe(() => {
      this.veiculos = this.veiculos.filter(v => v.id !== id);
    });
  }
}
