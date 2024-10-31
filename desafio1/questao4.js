class Aluno {
    constructor(matricula, nome) {
      this.matricula = matricula;
      this.nome = nome;
      this.P1 = null;
      this.P2 = null;
    }
  
    lancarNota(prova, nota) {
      if (prova === 'P1') {
        this.P1 = nota;
      } else if (prova === 'P2') {
        this.P2 = nota;
      } else {
        throw new Error("Prova inválida. Use 'P1' ou 'P2'.");
      }
    }
  
    get notaFinal() {
      if (this.P1 !== null && this.P2 !== null) {
        return ((this.P1 + this.P2) / 2).toFixed(1);
      } else if (this.P1 !== null) {
        return (this.P1 / 2).toFixed(1);
      } else if (this.P2 !== null) {
        return (this.P2 / 2).toFixed(1);
      } else {
        return (0.0).toFixed(1);
      }
    }
  }
  
  class Turma {
    constructor() {
      this.alunos = [];
    }
  
    inserirAluno(aluno) {
      if (this.alunos.some(a => a.matricula === aluno.matricula)) {
        console.log("Aluno com essa matrícula já existe.");
        return;
      }
      this.alunos.push(aluno);
    }
  
    removerAluno(matricula) {
      const index = this.alunos.findIndex(aluno => aluno.matricula === matricula);
      if (index !== -1) {
        this.alunos.splice(index, 1);
      } else {
        console.log("Aluno não encontrado.");
      }
    }
  
    lancarNota(matricula, prova, nota) {
      const aluno = this.alunos.find(a => a.matricula === matricula);
      if (aluno) {
        aluno.lancarNota(prova, nota);
      } else {
        console.log("Aluno não encontrado.");
      }
    }
  
    imprimirAlunos() {
      console.log("—---------------------------------------");
      console.log("Matricula   Nome               P1    P2    NF");
      console.log("—---------------------------------------");
  
      const alunosOrdenados = [...this.alunos].sort((a, b) => a.nome.localeCompare(b.nome));
      alunosOrdenados.forEach(aluno => {
        const p1 = aluno.P1 !== null ? aluno.P1.toFixed(1) : "-";
        const p2 = aluno.P2 !== null ? aluno.P2.toFixed(1) : "-";
        console.log(
          `${aluno.matricula}    ${aluno.nome.padEnd(20)} ${p1.padEnd(5)} ${p2.padEnd(5)} ${aluno.notaFinal}`
        );
      });
  
      console.log("—---------------------------------------");
    }
  }
  
  const prompt = require('prompt-sync')({ sigint: true });
  
  const turma = new Turma();
  
  while (true) {
    console.log("\n1. Inserir Aluno");
    console.log("2. Remover Aluno");
    console.log("3. Lançar Nota");
    console.log("4. Imprimir Alunos");
    console.log("5. Sair");
  
    const opcao = prompt("Escolha uma opção: ");
  
    if (opcao === "1") {
      const matricula = prompt("Digite a matrícula do aluno: ");
      const nome = prompt("Digite o nome do aluno: ");
      const aluno = new Aluno(matricula, nome);
      turma.inserirAluno(aluno);
    } else if (opcao === "2") {
      const matricula = prompt("Digite a matrícula do aluno a ser removido: ");
      turma.removerAluno(matricula);
    } else if (opcao === "3") {
      const matricula = prompt("Digite a matrícula do aluno: ");
      const prova = prompt("Digite a prova (P1 ou P2): ");
      const nota = parseFloat(prompt("Digite a nota: "));
      turma.lancarNota(matricula, prova, nota);
    } else if (opcao === "4") {
      turma.imprimirAlunos();
    } else if (opcao === "5") {
      break;
    } else {
      console.log("Opção inválida.");
    }
  }
  