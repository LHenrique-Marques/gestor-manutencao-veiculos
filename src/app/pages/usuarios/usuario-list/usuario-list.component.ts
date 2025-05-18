import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuario-list.component.html',
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.getAll().subscribe(data => {
      this.usuarios = data;
    });
  }

  excluir(usuario: Usuario): void {
    if (confirm('Deseja realmente excluir este usuário?')) {
      this.usuarioService.getVeiculosByUsuarioId(usuario.id).subscribe(veiculos => {
        if (veiculos.length > 0) {
          const destinoId = prompt('Digite o ID do usuário para transferir os veículos:');
          if (!destinoId || destinoId.trim() === '') return alert('ID inválido.');

          veiculos.forEach(veiculo => {
            const atualizado = { ...veiculo, usuarioId: destinoId };
            this.usuarioService.transferirVeiculo(veiculo.id, atualizado).subscribe();
          });
        }

        this.usuarioService.delete(usuario.id).subscribe(() => {
          this.carregarUsuarios();
        });
      });
    }
  }

  promoverAdmin(usuario: Usuario): void {
    const atualizado: Usuario = { ...usuario, role: 'admin' };
    this.usuarioService.update(usuario.id, atualizado).subscribe(() => {
      usuario.role = 'admin';
    });
  }
}
