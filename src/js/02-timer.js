import Notiflix from 'notiflix';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

let endDate;
let timer;

const dayTimer = document.querySelector('[data-days]');
const hourTimer = document.querySelector('[data-hours]');
const minTimer = document.querySelector('[data-minutes]');
const secTimer = document.querySelector('[data-seconds]');

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      endDate = selectedDates[0];
      startBtn.disabled = false;
      Notiflix.Notify.success('Correct date. Please click the start button.');
    } else {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future.');
      // window.alert('Please choose a date in the future');
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function plusZero(num) {
  return num < 10 ? '0' + num : num;
}

startBtn.addEventListener('click', () => {
  timer = setInterval(() => {
    if (endDate - new Date() > 0) {
      dayTimer.textContent = plusZero(convertMs(endDate - new Date()).days);
      hourTimer.textContent = plusZero(convertMs(endDate - new Date()).hours);
      minTimer.textContent = plusZero(convertMs(endDate - new Date()).minutes);
      secTimer.textContent = plusZero(convertMs(endDate - new Date()).seconds);
    } else {
      clearInterval(timer);
    }
  }, 1000);
});
