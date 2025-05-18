import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ManutencaoService } from '../../../services/manutencao.service';
import { Manutencao } from '../../../models/manutencao.model';

@Component({
  selector: 'app-manutencao-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manutencao-list.component.html',
})
export class ManutencaoListComponent {
  manutencoes: Manutencao[] = [];
  veiculoId!: number;

  constructor(
    public manutencaoService: ManutencaoService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.veiculoId = Number(this.route.snapshot.paramMap.get('veiculoId'));
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
