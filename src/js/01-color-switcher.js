const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', changeColor);
btnStop.addEventListener('click', stopChangeColor);

function changeColor() {
  btnStart.disabled = true;
  btnStop.disabled = false;
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function stopChangeColor() {
  btnStop.disabled = true;
  btnStart.disabled = false;
  clearInterval(timerId);
}
