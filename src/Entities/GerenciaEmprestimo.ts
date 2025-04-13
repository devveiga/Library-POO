import { Emprestimo } from './Emprestimo';
import { Membro } from './Membro';
import { Livro } from './Livro';
import * as fs from 'fs';

export class GerenciadorEmprestimos {
  private emprestimos: Emprestimo[] = [];

  public registrarEmprestimo(idEmprestimo: number, membro: Membro, livro: Livro): void {
    const novoEmprestimo = new Emprestimo(idEmprestimo, new Date(), membro, livro);
    this.emprestimos.push(novoEmprestimo);
    console.log(`Empréstimo registrado com sucesso:`);
    console.log(novoEmprestimo.exibirInformacoes());
  }

  public registrarDevolucao(idEmprestimo: number, dataDevolucao: Date): void {
    const emprestimo = this.emprestimos.find(emp => emp.getIdEmprestimo() === idEmprestimo);
    if (!emprestimo) {
      console.log(`Empréstimo com ID ${idEmprestimo} não encontrado.`);
      return;
    }

    emprestimo.devolverLivro(dataDevolucao);
    console.log(`Livro devolvido com sucesso:`);
    console.log(emprestimo.exibirInformacoes());
  }

  public listarEmprestimosAtivos(): void {
    const emprestimosAtivos = this.emprestimos.filter(emp => emp.getDataDevolucao() === null);
    console.log(`Empréstimos Ativos:`);
    emprestimosAtivos.forEach(emp => console.log(emp.exibirInformacoes()));
  }

  public listarEmprestimosDevolvidos(): void {
    const emprestimosDevolvidos = this.emprestimos.filter(emp => emp.getDataDevolucao() !== null);
    console.log(`Empréstimos Devolvidos:`);
    emprestimosDevolvidos.forEach(emp => console.log(emp.exibirInformacoes()));
  }

  public listarHistoricoEmprestimos(): void {
    console.log(`Histórico de Empréstimos:`);
    this.emprestimos.forEach(emp => console.log(emp.exibirInformacoes()));
    

  }

  public salvarDados(arquivo: string, dados: Emprestimo[]): void {
    const conteudo = dados.map(emprestimo => 
      `${emprestimo.getIdEmprestimo()},${emprestimo.getDataEmprestimo().toLocaleDateString()},${emprestimo.getMembro().getMatricula()},${emprestimo.getLivro().getTitulo()}`
    ).join('\n');
    
    fs.writeFileSync(arquivo, conteudo, 'utf8');
    console.log(`Dados salvos em ${arquivo}`);
  }
}
