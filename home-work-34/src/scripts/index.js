import "../styles/main.scss";
import {setupCounter} from "./counter.js";
import fingerIcon from "../assets/images/index-finger.svg"

const appDiv = document.querySelector('#app');
appDiv.innerHTML = `
  <button type="button" id="clicker">Click here to increment the counter</button>
  <button type="button" id="counter"></button>
`;

const counterBtn = document.querySelector('#counter');
const clickerBtn = document.querySelector('#clicker');

const icon = new Image();
icon.src = fingerIcon;
clickerBtn.appendChild(icon);

setupCounter(counterBtn, clickerBtn);