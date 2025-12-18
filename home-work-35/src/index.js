import "./styles/main.scss";
import { setupCounter } from "./scripts/counter";

const rootDiv = document.querySelector('#root');
rootDiv.innerHTML = `
  <button type="button" id="clicker">Click here to increment the counter</button>
  <button type="button" id="counter"></button>
`;

const counterBtn = document.querySelector('#counter');
const clickerBtn = document.querySelector('#clicker');

setupCounter(counterBtn, clickerBtn);