export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  role?: 'admin' | 'user';
}
