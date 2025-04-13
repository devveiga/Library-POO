export class Pessoa {
  private nome: string;
  private telefone: string;

  constructor(nome: string, telefone: string) {
    this.nome = nome;
    this.telefone = telefone;
  }

  public getNome(): string {
    return this.nome;
  }

  public getTelefone(): string {
    return this.telefone;
  }
  public setNome(novoNome: string): void {
    this.nome = novoNome;
  }
  public setTelefone(novoTelefone: string): void {
    this.telefone = novoTelefone
  }
}
