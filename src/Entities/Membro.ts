import { Pessoa } from './Pessoa';

export class Membro extends Pessoa {
  private matricula: string;
  private endereco: string;

  constructor(nome: string, telefone: string, matricula: string, endereco: string) {
    super(nome, telefone);
    this.matricula = matricula;
    this.endereco = endereco;
  }

  public getMatricula(): string {
    return this.matricula;
  }

  public getEndereco(): string {
    return this.endereco;
  }

  public exibirInformacoes(): string {
    return `Nome: ${this.getNome()}, Matrícula: ${this.matricula}, Endereço: ${this.endereco}, Telefone: ${this.getTelefone()}`;
  }
  public setEndereco(novoEndereco: string): void {
    this.endereco = novoEndereco
  }
}
