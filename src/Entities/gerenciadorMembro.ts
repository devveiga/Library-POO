import { ManipuladorCSV } from "../Utils/Crud";
import { Membro } from "./Membro";
const prompt = require('prompt-sync')();

export class GerenciadorMembro extends ManipuladorCSV<Membro> {
  private membros: Membro[] = [];

  constructor() {
    super();

    this.membros = this.carregarDados('membros.csv');
  }

  
  public cadastrarMembro(nome: string, telefone: string, matricula: string, endereco: string): void {
    const membroExistente = this.membros.find(membro => membro.getMatricula() === matricula);

    if (membroExistente) {
      console.log("Usuário já cadastrado com esta matrícula.");
      return;
    }

    const novoMembro = new Membro(nome, telefone, matricula, endereco);
    this.membros.push(novoMembro);
    console.log(`Membro cadastrado com sucesso: ${novoMembro.exibirInformacoes()}`);

    
    this.salvarDados('membros.csv', this.membros);
  }

  public listarMembros(): void {
    if (this.membros.length === 0) {
      console.log("Nenhum membro cadastrado.");
    } else {
      console.log("Lista de Membros:");
      this.membros.forEach((membro, index) => {
        console.log(`#${index + 1} ${membro.exibirInformacoes()}`);
      });
    }
  }

  public atualizarInformacaoMembro(): void {
    const matricula = prompt(`Número de matrícula: `);
    const novoNome = prompt(`Novo nome: `);
    const novoTelefone = prompt(`Novo telefone: `);
    const novoEndereco = prompt(`Novo endereço: `);

    const index = this.membros.findIndex(membro => membro.getMatricula() === matricula);
    if (index === -1) {
      console.log(`Membro com matrícula ${matricula} não encontrado.`);
      return;
    }

    if (novoNome) {
      this.membros[index].setNome(novoNome);
    }
    if (novoTelefone) {
      this.membros[index].setTelefone(novoTelefone);
    }
    if (novoEndereco) {
      this.membros[index].setEndereco(novoEndereco);
    }

    console.log(`Informações do membro com matrícula ${matricula} atualizadas com sucesso.`);

    this.salvarDados('membros.csv', this.membros);
  }

  public buscarMembroPorMatricula(matricula: string): Membro | null {
    return this.membros.find(membro => membro.getMatricula() === matricula) || null;
  }

  public removerMembro(): void {
    const matricula = prompt(`Digite o número da matrícula do membro a ser removido: `);

    const index = this.membros.findIndex(membro => membro.getMatricula() === matricula);

    if (index === -1) {
      console.log(`Membro com matrícula ${matricula} não encontrado.`);
      return;
    }

    const membroRemovido = this.membros.splice(index, 1);
    console.log(`Membro removido com sucesso: ${membroRemovido[0].exibirInformacoes()}`);

    this.salvarDados('membros.csv', this.membros);
  }

  public converterParaCSV(membros: Membro[]): string {
    return membros.map(membro => 
      `${membro.getNome()},${membro.getTelefone()},${membro.getMatricula()},${membro.getEndereco()}`
    ).join('\n');
  }

  public converterDeCSV(linha: string): Membro {
    const [nome, telefone, matricula, endereco] = linha.split(',');
    return new Membro(nome, telefone, matricula, endereco);
  }
}
