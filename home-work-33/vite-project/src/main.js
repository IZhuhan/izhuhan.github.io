import './styles/style.scss';
import {setupCounter} from "./counter.js";

const appDiv = document.querySelector('#app');
appDiv.innerHTML = `
  <button type="button" id="clicker">Click here to increment the counter</button>
  <button type="button" id="counter"></button>
`;

const counterBtn = document.querySelector('#counter');
const clickerBtn = document.querySelector('#clicker');

setupCounter(counterBtn, clickerBtn);