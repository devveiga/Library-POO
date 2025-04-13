import { GerenciadorLivro } from './Entities/gerenciadorLivro';
import { GerenciadorMembro } from './Entities/gerenciadorMembro';
import { GerenciadorEmprestimos } from './Entities/GerenciaEmprestimo';  

const prompt = require('prompt-sync')();
const gMembro = new GerenciadorMembro();
const gLivro = new GerenciadorLivro();
const gEmprestimos = new GerenciadorEmprestimos();  

let opcao: number;

do {
  console.log("\nMenu de Gerenciamento: ");
  console.log("-----------------------------------");
  console.log("1. Cadastrar Membro");
  console.log("2. Listar Membros");
  console.log("3. Atualizar Membros");
  console.log("4. Remover Membro");
  console.log("-------- // --------");
  console.log("5. Cadastrar Livros");
  console.log("6. Listar Livros");
  console.log("7. Atualizar Livros");
  console.log("8. Remover Livros");
  console.log("9. Sair");
  console.log("-------- // --------");
  console.log("10. Registrar Empréstimo");
  console.log("11. Listar Empréstimos Ativos");
  console.log("12. Listar Empréstimos Devolvidos");
  console.log("13. Listar Histórico de Empréstimos");
  console.log("14. Registrar Devolução");

  opcao = Number(prompt("Digite sua opção: "));

  switch (opcao) {
    case 1:
      const nome = prompt("Digite o nome do membro: ");
      const telefone = prompt("Digite o telefone do membro: ");
      const matricula = prompt("Digite a matrícula do membro: ");
      const endereco = prompt("Digite o endereço do membro: ");
      gMembro.cadastrarMembro(nome, telefone, matricula, endereco);
      break;

    case 2:
      gMembro.listarMembros();
      break;

    case 3:
      gMembro.atualizarInformacaoMembro();
      break;

    case 4:
      gMembro.removerMembro();
      break;

    case 5:
      const isbn = prompt("Digite a ISBN do livro: ");
      const titulo = prompt("Digite o título do livro: ");
      const autor = prompt("Digite o autor do livro: ");
      const anoPublicacao = prompt("Digite o ano de publicação do livro: ");
      gLivro.cadastrarLivro(titulo, autor, anoPublicacao, isbn);
      break;

    case 6:
      gLivro.listarLivros();
      break;

    case 7:
      gLivro.atualizarInformacaoLivro();
      break;

    case 8:
      gLivro.removerLivro();
      break;

    case 9:
      console.log("Saindo do sistema...");
      break;

    case 10:
      const matriculaEmprestimo = prompt("Digite a matrícula do membro para empréstimo: ");
      const livroTitulo = prompt("Digite o título do livro a ser emprestado: ");
      const membroEmprestimo = gMembro.buscarMembroPorMatricula(matriculaEmprestimo);
      const livroEmprestimo = gLivro.buscarLivroPorTitulo(livroTitulo);

      if (membroEmprestimo && livroEmprestimo) {
        gEmprestimos.registrarEmprestimo(Date.now(), membroEmprestimo, livroEmprestimo);
      } else {
        console.log("Membro ou livro não encontrado.");
      }
      break;

    case 11:
      gEmprestimos.listarEmprestimosAtivos();
      break;

    case 12:
      gEmprestimos.listarEmprestimosDevolvidos();
      break;

    case 13:
      gEmprestimos.listarHistoricoEmprestimos();
      break;

    case 14:
      const idDevolucao = Number(prompt("Digite o ID do empréstimo a devolver: "));
      const dataDevolucao = new Date(prompt("Digite a data de devolução (YYYY-MM-DD): "));
      gEmprestimos.registrarDevolucao(idDevolucao, dataDevolucao);
      break;

    default:
      console.log("Opção inválida. Tente novamente.");
  }

    gMembro.salvarDados('membros.csv', gMembro['membros']);
    gLivro.salvarDados('livros.csv', gLivro['livros']);
    gEmprestimos.salvarDados('emprestimos.csv', gEmprestimos['emprestimos']);
  

} while (opcao !== 9);
