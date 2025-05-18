import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { VeiculoListComponent } from './pages/veiculos/veiculo-list/veiculo-list.component';
import { VeiculoFormComponent } from './pages/veiculos/veiculo-form/veiculo-form.component';
import { ManutencaoListComponent } from './pages/manutencoes/manutencao-list/manutencao-list.component';
import { ManutencaoFormComponent } from './pages/manutencoes/manutencao-form/manutencao-form.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'veiculos', component: VeiculoListComponent, canActivate: [AuthGuard] },
  { path: 'veiculos/novo', component: VeiculoFormComponent, canActivate: [AuthGuard] },
  { path: 'veiculos/editar/:id', component: VeiculoFormComponent, canActivate: [AuthGuard] },
  { path: 'manutencoes/:veiculoId', component: ManutencaoListComponent, canActivate: [AuthGuard] },
  { path: 'manutencoes/:veiculoId/nova', component: ManutencaoFormComponent, canActivate: [AuthGuard] },
  { path: 'manutencoes/:veiculoId/editar/:id', component: ManutencaoFormComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'usuarios/novo',loadComponent: () => import('./pages/usuarios/usuario-form/usuario-form.component').then(m => m.UsuarioFormComponent)},
  { path: 'usuarios',loadComponent: () =>import('./pages/usuarios/usuario-list/usuario-list.component').then(m => m.UsuarioListComponent),canActivate: [AdminGuard]},
  { path: 'usuarios/editar/:id',loadComponent: () =>import('./pages/usuarios/usuario-form/usuario-form.component').then((m) => m.UsuarioFormComponent),},
  { path: 'veiculos',loadComponent: () =>import('./pages/veiculos/veiculo-list/veiculo-list.component').then((m) => m.VeiculoListComponent),},
];