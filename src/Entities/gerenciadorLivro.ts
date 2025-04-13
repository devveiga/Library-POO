import { Livro } from "./Livro";
import { ManipuladorCSV } from "../Utils/Crud";  
const prompt = require('prompt-sync')();

export class GerenciadorLivro extends ManipuladorCSV<Livro> {
  private livros: Livro[] = [];

  constructor() {
    super();
  
    this.livros = this.carregarDados('livros.csv');
  }

  public cadastrarLivro(titulo: string, autor: string, anoPublicacao: number, isbn: number): void {
    const novoLivro = new Livro(titulo, autor, anoPublicacao, isbn);
    this.livros.push(novoLivro);
    console.log(`-------------------------------------------------------------------`);
    console.log(`Livro cadastrado com sucesso: ${novoLivro.exibirInformacoesLivro()}`);

  
    this.salvarDados('livros.csv', this.livros);
  }

  
  public listarLivros(): void {
    if (this.livros.length === 0) {
      console.log("Nenhum livro cadastrado.");
    } else {
      console.log("Lista de livros:");
      this.livros.forEach((livro, index) => {
        console.log(`#${index + 1} ${livro.exibirInformacoesLivro()}`);
      });
    }
  }


  public atualizarInformacaoLivro(): void {
    const isbn = prompt(`ISBN do livro: `);
    const novoTitulo = prompt(`Atualizar título: `);
    const novoAutor = prompt(`Atualizar autor: `);
    const novoAnoPublicacao = prompt(`Atualizar ano de publicação: `);

    const index = this.livros.findIndex(livro => livro.getIsbn() === isbn);
    if (index === -1) {
      console.log(`Nenhuma ISBN com valor fornecido.`);
      return;
    }

    if (novoTitulo) {
      this.livros[index].setTitulo(novoTitulo);
    }
    if (novoAutor) {
      this.livros[index].setAutor(novoAutor);
    }
    if (novoAnoPublicacao) {
      this.livros[index].setAnoPublicacao(novoAnoPublicacao);
    }

    console.log(`Informações do livro com ISBN ${isbn} atualizadas com sucesso.`);

    this.salvarDados('livros.csv', this.livros);
  }

  public removerLivro(): void {
    const isbn = prompt(`Digite o número da ISBN do livro a ser removido: `);

    const index = this.livros.findIndex(livro => livro.getIsbn() === isbn);
    if (index === -1) {
      console.log(`Livro com ISBN: ${isbn} não encontrado.`);
      return;
    }
    const livroRemovido = this.livros.splice(index, 1);
    console.log(`Livro removido com sucesso: ${livroRemovido[0].exibirInformacoesLivro()}`);


    this.salvarDados('livros.csv', this.livros);
  }

  public buscarLivroPorTitulo(titulo: string): Livro | null {
    return this.livros.find(livro => livro.getTitulo() === titulo) || null;
  }

  public converterParaCSV(livros: Livro[]): string {
    return livros.map(livro => 
      `${livro.getTitulo()},${livro.getAutor()},${livro.getAnoPublicacao()},${livro.getIsbn()}`
    ).join('\n');
  }

  public converterDeCSV(linha: string): Livro {
    const [titulo, autor, anoPublicacao, isbn] = linha.split(',');
    return new Livro(titulo, autor, parseInt(anoPublicacao), parseInt(isbn));
  }
}
