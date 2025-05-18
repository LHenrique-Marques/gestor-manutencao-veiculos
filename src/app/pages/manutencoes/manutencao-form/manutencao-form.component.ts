import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ManutencaoService } from '../../../services/manutencao.service';
import { Manutencao } from '../../../models/manutencao.model';

@Component({
  selector: 'app-manutencao-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './manutencao-form.component.html',
})
export class ManutencaoFormComponent {
  form: FormGroup;
  isEdit = false;
  manutencaoId!: number;
  veiculoId!: number;

  constructor(
    public fb: FormBuilder,
    public manutencaoService: ManutencaoService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.form = this.fb.group({
      data: ['', Validators.required],
      quilometragem: ['', Validators.required],
      servico: ['', Validators.required],
      observacoes: ['']
    });
  }

  ngOnInit() {
    this.veiculoId = Number(this.route.snapshot.paramMap.get('veiculoId'));
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.manutencaoId = Number(id);
      this.manutencaoService.getById(this.manutencaoId).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data: Manutencao = {
      ...this.form.value,
      veiculoId: this.veiculoId,
      id: this.manutencaoId
    };

    const request = this.isEdit
      ? this.manutencaoService.update(this.manutencaoId, data)
      : this.manutencaoService.create(data);

    request.subscribe(() => {
      this.router.navigate(['/manutencoes', this.veiculoId]);
    });
  }
}
