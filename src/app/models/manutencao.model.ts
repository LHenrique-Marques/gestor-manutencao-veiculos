export interface Manutencao {
  id: number;
  veiculoId: number;
  data: string; 
  quilometragem: number;
  servico: string;
  observacoes?: string;
}
