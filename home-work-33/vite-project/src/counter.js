export function setupCounter(counterBtn, clickerBtn) {
  let counter = 0;
  const setCounter = (count) => {
    counter = count;
    counterBtn.innerHTML = `Count is ${counter}`;
  };

  clickerBtn.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}
