import Notiflix from 'notiflix';

const form = document.querySelector('.form');
// console.log(form);

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', hendlerPromise);
function hendlerPromise(evn) {
  event.preventDefault();
  const deley = Number(evn.target.elements.delay.value);
  const step = Number(evn.target.elements.step.value);
  const amount = Number(evn.target.elements.amount.value);
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, deley + (i - 1) * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
