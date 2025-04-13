import { Membro } from './Membro';
import { Livro } from './Livro';

export class Emprestimo {
  private idEmprestimo: number;
  private dataEmprestimo: Date;
  private dataDevolucao: Date | null; 
  private membro: Membro;
  private livro: Livro;

  constructor(idEmprestimo: number, dataEmprestimo: Date, membro: Membro, livro: Livro, dataDevolucao: Date | null = null) {
    this.idEmprestimo = idEmprestimo;
    this.dataEmprestimo = dataEmprestimo;
    this.dataDevolucao = dataDevolucao;
    this.membro = membro;
    this.livro = livro;
  }

  public getIdEmprestimo(): number {
    return this.idEmprestimo;
  }

  public getDataEmprestimo(): Date {
    return this.dataEmprestimo;
  }

  public getDataDevolucao(): Date | null {
    return this.dataDevolucao;
  }

  public getMembro(): Membro {
    return this.membro;
  }

  public getLivro(): Livro {
    return this.livro;
  }

  public devolverLivro(dataDevolucao: Date): void {
    this.dataDevolucao = dataDevolucao;
  }

  public exibirInformacoes(): string {
    return `Empréstimo #${this.idEmprestimo} | Membro: ${this.membro.getNome()} | Livro: ${this.livro.getTitulo()} | Data Empréstimo: ${this.dataEmprestimo.toLocaleDateString()} | ${
      this.dataDevolucao ? `Data Devolução: ${this.dataDevolucao.toLocaleDateString()}` : 'Ativo'
    }`;
  }
}
