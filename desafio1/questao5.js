const prompt = require("prompt-sync")({ sigint: true });

function lerNome() {
  const nome = prompt("Digite o nome (pelo menos 5 caracteres): ");
  if (nome.length >= 5) return nome;
  console.log("Erro: O nome deve ter pelo menos 5 caracteres.");
}

function lerCPF() {
  const cpf = prompt("Digite o CPF (11 dígitos): ").replace(/\D/g, "");
  if (cpf.length === 11 && !isNaN(Number(cpf))) return Number(cpf);
  console.log("Erro: O CPF deve ter exatamente 11 dígitos numéricos.");
}

function lerDataNascimento() {
  const data = prompt("Digite a data de nascimento (DD/MM/AAAA): ");
  const [dia, mes, ano] = data.split("/").map(Number);
  const dataNascimento = new Date(ano, mes - 1, dia);
  const hoje = new Date();
  const idade =
    hoje.getFullYear() -
    dataNascimento.getFullYear() -
    (hoje < new Date(hoje.getFullYear(), mes - 1, dia) ? 1 : 0);

  if (dataNascimento instanceof Date && !isNaN(dataNascimento) && idade >= 18) {
    return dataNascimento;
  }
  console.log(
    "Erro: A data deve estar no formato DD/MM/AAAA e o cliente deve ter pelo menos 18 anos."
  );
}

function lerRendaMensal() {
  let renda = prompt(
    "Digite a renda mensal (use vírgula para decimal, ex: 1500,50): "
  ).replace(",", ".");
  renda = parseFloat(renda);

  if (!isNaN(renda) && renda >= 0) return renda;
  console.log("Erro: A renda mensal deve ser um número maior ou igual a 0.");
}

function lerEstadoCivil() {
  const estadoCivil = prompt(
    "Digite o estado civil (C, S, V ou D): "
  ).toUpperCase();
  if (["C", "S", "V", "D"].includes(estadoCivil)) return estadoCivil;
  console.log(
    "Erro: Estado civil inválido. Use C (casado), S (solteiro), V (viúvo) ou D (divorciado)."
  );
}

function lerDependentes() {
  const dependentes = Number(
    prompt("Digite o número de dependentes (0 a 10): ")
  );
  if (!isNaN(dependentes) && dependentes >= 0 && dependentes <= 10)
    return dependentes;
  console.log("Erro: O número de dependentes deve estar entre 0 e 10.");
}

function formatarCPF(cpf) {
  return cpf.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function formatarRenda(renda) {
  return renda.toFixed(2).replace(".", ",");
}

function main() {
  const cliente = {
    nome: lerNome(),
    cpf: lerCPF(),
    dataNascimento: lerDataNascimento(),
    rendaMensal: lerRendaMensal(),
    estadoCivil: lerEstadoCivil(),
    dependentes: lerDependentes(),
  };

  console.log("\nDados do Cliente:");
  console.log("Nome:", cliente.nome);
  console.log("CPF:", formatarCPF(cliente.cpf));
  console.log("Data de Nascimento:", formatarData(cliente.dataNascimento));
  console.log("Renda Mensal: R$", formatarRenda(cliente.rendaMensal));
  console.log("Estado Civil:", cliente.estadoCivil);
  console.log("Dependentes:", cliente.dependentes);
}

main();
