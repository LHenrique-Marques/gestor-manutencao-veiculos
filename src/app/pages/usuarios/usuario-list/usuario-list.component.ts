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
    this.usuarioService.getAll().subscribe(data => {
      this.usuarios = data;
    });
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.delete(id).subscribe(() => {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
      });
    }
  }
  promoverAdmin(usuario: Usuario) {
  const promovido: Usuario = { ...usuario, role: 'admin' };
  this.usuarioService.update(usuario.id, promovido).subscribe(() => {
    usuario.role = 'admin'; // atualiza localmente
  });
}
}
