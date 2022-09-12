import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('input[name=delay]');
const stepEl = document.querySelector('input[name=step]');
const amountEl = document.querySelector('input[name=amount]');
const btnEl = document.querySelector('button[type=submit]');

formEl.addEventListener('submit', onformSubmit);

function onformSubmit(evt) {
  evt.preventDefault();

  let delay = Number(delayEl.value);
  let step = Number(stepEl.value);
  let amount = Number(amountEl.value);

  for (let value = 1; value <= amount; value += 1) {
    //  console.log(value);
    createPromise(value, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
