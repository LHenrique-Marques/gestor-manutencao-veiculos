import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ManutencaoService } from '../../../services/manutencao.service';
import { Manutencao } from '../../../models/manutencao.model';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-manutencao-list',
  standalone: true,
  imports: [
  CommonModule,
  RouterModule,
  MatCardModule,
  MatListModule,
  MatButtonModule,
  MatIconModule
  ],
  templateUrl: './manutencao-list.component.html',
  styleUrl:'manutencao-list.component.css'
})
export class ManutencaoListComponent {
  manutencoes: Manutencao[] = [];
  veiculoId!: string;

  constructor(
    public manutencaoService: ManutencaoService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.veiculoId = this.route.snapshot.paramMap.get('veiculoId')!;
    this.manutencaoService.getByVeiculoId(this.veiculoId).subscribe(data => {
      this.manutencoes = data;
    });
  }

  excluir(id: number) {
    this.manutencaoService.delete(id).subscribe(() => {
      this.manutencoes = this.manutencoes.filter(m => m.id !== id);
    });
  }
}
