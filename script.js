// Estado inicial dos times (agora com 'presenca')
const times = [
  { nome: "SHAKTAR LEK", jogos: 0, vitorias: 0, empates: 0, derrotas: 0, saldo: 0, pontos: 0, presenca: 0 },
  { nome: "OS GURIS FC", jogos: 0, vitorias: 0, empates: 0, derrotas: 0, saldo: 0, pontos: 0, presenca: 0 },
  { nome: "NIKE FC", jogos: 0, vitorias: 0, empates: 0, derrotas: 0, saldo: 0, pontos: 0, presenca: 0 },
  { nome: "REAL GETAFFE", jogos: 0, vitorias: 0, empates: 0, derrotas: 0, saldo: 0, pontos: 0, presenca: 0 },
  { nome: "VASCO", jogos: 0, vitorias: 0, empates: 0, derrotas: 0, saldo: 0, pontos: 0, presenca: 0 },
  { nome: "ESPANHA", jogos: 0, vitorias: 0, empates: 0, derrotas: 0, saldo: 0, pontos: 0, presenca: 0 }
];

function atualizarTabela() {
  const tbody = document.querySelector("#tabela tbody");
  tbody.innerHTML = "";

  // Ordena por pontos e saldo de gols; se quiser incluir presença como critério, adicione abaixo
  const ranking = [...times].sort((a, b) => {
    if (b.pontos !== a.pontos) return b.pontos - a.pontos;
    if (b.saldo !== a.saldo) return b.saldo - a.saldo;
    return b.presenca - a.presenca; // desempate opcional por presença
  });

  ranking.forEach((time, index) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${index + 1}º</td>
      <td>${time.nome}</td>
      <td>${time.jogos}</td>
      <td>${time.vitorias}</td>
      <td>${time.empates}</td>
      <td>${time.derrotas}</td>
      <td>${time.saldo}</td>
      <td>${time.pontos}</td>
      <td>${time.presenca}</td>
    `;
    tbody.appendChild(linha);
  });
}

function adicionarResultado(time1, gols1, presenca1, time2, gols2, presenca2) {
  if (!time1 || !time2) {
    alert("Selecione ambos os times.");
    return;
  }
  if (time1 === time2) {
    alert("Um time não pode jogar contra ele mesmo!");
    return;
  }

  const t1 = times.find(t => t.nome === time1);
  const t2 = times.find(t => t.nome === time2);

  if (!t1 || !t2) {
    alert("Times inválidos.");
    return;
  }

  // Normaliza números (evita NaN)
  const g1 = Number.isFinite(gols1) ? gols1 : 0;
  const g2 = Number.isFinite(gols2) ? gols2 : 0;
  const p1 = Number.isFinite(presenca1) ? presenca1 : 0;
  const p2 = Number.isFinite(presenca2) ? presenca2 : 0;

  // Atualiza jogos
  t1.jogos++;
  t2.jogos++;

  // Saldo de gols (marcados - sofridos)
  t1.saldo += (g1 - g2);
  t2.saldo += (g2 - g1);

  // Resultado
  if (g1 > g2) {
    t1.vitorias++; t1.pontos += 3;
    t2.derrotas++;
  } else if (g1 < g2) {
    t2.vitorias++; t2.pontos += 3;
    t1.derrotas++;
  } else {
    t1.empates++; t2.empates++;
    t1.pontos++; t2.pontos++;
  }

  // Soma presença individual
  t1.presenca += p1;
  t2.presenca += p2;

  atualizarTabela();
}

// Inicializa tabela
atualizarTabela();

// Login simples
const usuarioAutorizado = "admin";
const senhaAutorizada = "1234";

document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value;

  if (usuario === usuarioAutorizado && senha === senhaAutorizada) {
    alert("Login realizado com sucesso!");
    document.getElementById("formLogin").style.display = "none";
    document.getElementById("formResultado").style.display = "block";
  } else {
    alert("Usuário ou senha incorretos!");
  }
});

document.getElementById("formResultado").addEventListener("submit", function (e) {
  e.preventDefault();

  const time1 = document.getElementById("time1").value;
  const time2 = document.getElementById("time2").value;

  const gols1 = parseInt(document.getElementById("gols1").value, 10);
  const gols2 = parseInt(document.getElementById("gols2").value, 10);

  const presenca1 = parseInt(document.getElementById("presenca1").value, 10);
  const presenca2 = parseInt(document.getElementById("presenca2").value, 10);

  // Validação básica
  if ([gols1, gols2, presenca1, presenca2].some(v => Number.isNaN(v) || v < 0)) {
    alert("Informe valores válidos (0 ou mais) para gols e presença.");
    return;
  }

  adicionarResultado(time1, gols1, presenca1, time2, gols2, presenca2);

  // Limpa apenas campos numéricos
  document.getElementById("gols1").value = "";
  document.getElementById("gols2").value = "";
  document.getElementById("presenca1").value = "0";
  document.getElementById("presenca2").value = "0";
});
