const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
stopBtn.disabled = true;
let bgColor = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBgColor() {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;
}

startBtn.addEventListener('click', () => {
  bgColor = setInterval(changeBgColor, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
});
stopBtn.addEventListener('click', () => {
  clearInterval(bgColor);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
