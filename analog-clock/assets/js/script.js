"use strict";

// const playSoundBtn = document.querySelector(".play-sound");

const playSound = false;

const numberHours = document.querySelector(".number-hours");
const secondsBar = document.querySelector(".seconds-bar");

const handHour = document.querySelector(".hand.hour");
const handMinute = document.querySelector(".hand.minute");
const handSecond = document.querySelector(".hand.second");

for (let i = 1; i <= 12; i++) {
  const pEle = document.createElement("p");
  const spanEle = document.createElement("span");
  spanEle.textContent = i;
  pEle.appendChild(spanEle);
  pEle.setAttribute("style", `--index:${i}`);
  numberHours.appendChild(pEle);
}

for (let i = 1; i <= 60; i++) {
  const pEle = document.createElement("p");
  const spanEle = document.createElement("span");
  pEle.appendChild(spanEle);
  pEle.setAttribute("style", `--index:${i}`);
  secondsBar.appendChild(pEle);
}

function getCurrentTime() {
  const date = new Date();
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();
  const currentSecond = date.getSeconds();

  const secondDeg = currentSecond * 6;
  const minuteDeg = currentMinute * 6 + currentSecond * 0.1;
  const hourDeg =
    currentHour * 30 + currentMinute * 0.5 + currentSecond * (0.5 / 60);

  handSecond.style.transform = `rotate(${secondDeg}deg)`;
  handMinute.style.transform = `rotate(${minuteDeg}deg)`;
  handHour.style.transform = `rotate(${hourDeg}deg)`;

  if (playSound) {
    const sound = new Audio("assets/audio/sound.wav");
    sound.play();
  }
}

getCurrentTime();
setInterval(getCurrentTime, 1000);
