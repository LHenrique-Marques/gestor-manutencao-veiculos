export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  role?: 'admin' | 'user';
}
