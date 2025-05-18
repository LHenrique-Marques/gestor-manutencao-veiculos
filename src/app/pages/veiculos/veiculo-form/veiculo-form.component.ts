import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VeiculoService } from '../../../services/veiculo.service';
import { AuthService } from '../../../services/auth.service';
import { Veiculo } from '../../../models/veiculo.model';

@Component({
  selector: 'app-veiculo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './veiculo-form.component.html',
})
export class VeiculoFormComponent {
  form: FormGroup;
  isEdit = false;
  veiculoId!: string;

  constructor(
    public fb: FormBuilder,
    public veiculoService: VeiculoService,
    public authService: AuthService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.form = this.fb.group({
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      ano: ['', [Validators.required, Validators.min(1900)]],
      combustivel: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.veiculoId = String(id);
      this.veiculoService.getById(this.veiculoId).subscribe(v => {
        this.form.patchValue(v);
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const usuario = this.authService.getUser();
    const data: Veiculo = {
  ...this.form.value,
  usuarioId: this.authService.getUser()?.id,
  };

    const request = this.isEdit
      ? this.veiculoService.update(this.veiculoId, data)
      : this.veiculoService.create(data);

    request.subscribe(() => this.router.navigate(['/veiculos']));
  }
}
