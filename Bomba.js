let numeroSecreto = gerarNumero();
let acertos = 0;
let coracoes = 5;

function gerarNumero() {
  return Math.floor(Math.random() * 100) + 1;
}

function verificarPalpite() {
  const palpite = parseInt(document.getElementById("guess").value);
  const feedback = document.getElementById("feedback");
  const hearts = document.getElementById("hearts");

  if (isNaN(palpite) || palpite < 1 || palpite > 100) {
    feedback.textContent = "Digite um número válido entre 1 e 100.";
    return;
  }

  if (palpite < numeroSecreto) {
    feedback.textContent = "Está frio!";
  } else if (palpite > numeroSecreto) {
    feedback.textContent = "Quente demais!";
  } else {
    acertos++;
    coracoes--;
    feedback.textContent = `Acertou! Faltam ${5 - acertos} números.`;
    hearts.textContent = "❤️".repeat(coracoes);

    if (acertos < 5) {
      numeroSecreto = gerarNumero(); // gera novo número
    } else {
      finalizarJogo();
    }
  }

  document.getElementById("guess").value = ""; // limpa campo
}

function finalizarJogo() {
  document.getElementById("game").remove(); // remove o jogo
  document.querySelector(".background").style.backgroundImage = "url('fundo2.png')"; // muda fundo
  document.querySelector(".tela").remove(); // remove a tela branca
  document.getElementById("victory-sound").play(); // toca som de vitória
}

