import * as fs from 'fs';
import * as path from 'path';

export abstract class ManipuladorCSV<T> {
  protected abstract converterParaCSV(dados: T[]): string;

  protected abstract converterDeCSV(linha: string): T;

  public carregarDados(arquivo: string): T[] {
    const filePath = path.join(__dirname, arquivo);
    
    if (fs.existsSync(filePath)) {
      const dados = fs.readFileSync(filePath, 'utf-8');
      const linhas = dados.split('\n');
      return linhas.map(linha => this.converterDeCSV(linha)).filter(item => item != null);
    } else {
      console.log(`Arquivo ${arquivo} não encontrado.`);
      return [];
    }
  }

  public salvarDados(arquivo: string, dados: T[]): void {
    const filePath = path.join(__dirname, arquivo);
    const csvData = this.converterParaCSV(dados);
    fs.writeFileSync(filePath, csvData, 'utf-8');
    console.log(`${arquivo} salvo com sucesso.`);
  }
}
