import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
console.log(input);
const btnStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minsEl = document.querySelector('[data-minutes]');
const secsEl = document.querySelector('[data-seconds]');
btnStart.disabled = true;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //  console.log('Выбранная дата-', selectedDates[0]);
    if (new Date() > selectedDates[0]) {
      // console.log('Сегодняшняя дата -', options.defaultDate);
      Notiflix.Notify.failure('Please choose a date in the future');
      // btnStart.disabled = true;
    } else {
      selectedDate = selectedDates[0];
      btnStart.disabled = false;
    }
  },
};
// console.log(options.defaultDate);
flatpickr(input, options);

const onCountdown = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    //  const startTime = Date.now(); //время начала отсчета
    this.isActive = true;

    //  console.log(startTime);
    setInterval(() => {
      // const currentTime = Date.now(); //текущее время
      // console.log(currentTime);
      const deltaTime = selectedDate - Date.now(); // разница между текущим временем и началом
      // console.log(deltaTime);
      const timeComponent = convertMs(deltaTime); // объект с данными в формате ДД:ЧЧ:ММ:СС
      updateDateFace(timeComponent);
    }, 1000);
  },
};

btnStart.addEventListener('click', () => {
  onCountdown.start();
  btnStart.disabled = true;
  input.disabled = true;
});
// /Превращает формат записи даты в ДД:ЧЧ:ММ:СС
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// /Рисует интерфейс
function updateDateFace({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minsEl.textContent = `${minutes}`;
  secsEl.textContent = `${seconds}`;
}
