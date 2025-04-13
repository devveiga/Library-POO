export class Livro {
    protected titulo: string;
    protected autor: string;
    protected anoPublicacao: number;
    protected isbn: number;
  
    constructor(titulo: string, autor: string, anoPublicacao: number, isbn: number) {
      this.titulo = titulo;
      this.autor = autor;
      this.anoPublicacao = anoPublicacao;
      this.isbn = isbn;
    }
  
    getTitulo(): string {
      return this.titulo;
    }
  
    getAutor(): string {
      return this.autor;
    }
  
    getIsbn(): number {
      return this.isbn
    }
    getAnoPublicacao(): number {
      return this.anoPublicacao;
    }
  
    exibirInformacoesLivro(): string {
      return `titulo: ${this.titulo}; autor: ${this.autor}; ano de publicação: ${this.anoPublicacao}`
    }

    public setTitulo(novoTitulo: string): void{
      this.titulo = novoTitulo;
    }
    public setAutor(novoAutor: string): void {
      this.autor = novoAutor;
    }
    public setAnoPublicacao(novoAnoPublicacao: number): void {
      this.anoPublicacao = novoAnoPublicacao;
    }
    }