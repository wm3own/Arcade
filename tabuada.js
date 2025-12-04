const inputNumber = document.getElementById('number');
const generateBtn = document.getElementById('generate');
const resultDiv = document.getElementById('result');

function generateTabuada(num) {
  let html = '<ul>';
  for (let i = 1; i <= 10; i++) {
    html += `<li>${num} × ${i} = ${num * i}</li>`;
  }
  html += '</ul>';
  return html;
}

generateBtn.addEventListener('click', () => {
  const num = parseInt(inputNumber.value);
  if (isNaN(num)) {
    resultDiv.innerHTML = 'Por favor, digite um número válido.';
    return;
  }
  resultDiv.innerHTML = generateTabuada(num);
});
