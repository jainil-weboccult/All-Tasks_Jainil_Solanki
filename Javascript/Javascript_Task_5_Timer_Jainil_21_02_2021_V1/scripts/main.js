var seconds = 0;
var hours = 0;
var minutes = 0;
var mseconds = 0;

var c;

start = document.querySelector(".Start");
pause = document.querySelector(".Pause");
stop = document.querySelector(".Stop");
reset = document.querySelector(".Reset");
tagline = document.querySelector(".tag");

phours = document.getElementById("hour");
pminutes = document.getElementById("minutes");
pseconds = document.getElementById("seconds");
pmseconds = document.getElementById("mseconds");

function timer() {
  if (mseconds == 99) {
    mseconds = 0;
    seconds++;
  } else if (seconds == 59) {
    seconds = 0;
    minutes++;
  } else if (minutes == 59) {
    minutes = 0;
    hours++;
  }
  mseconds++;

  phours.innerHTML = hours < 10 ? "0" + hours : hours;
  pminutes.innerHTML = minutes < 10 ? "0" + minutes : minutes;
  pseconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;
  pmseconds.innerHTML = mseconds < 10 ? "0" + mseconds : mseconds;
}

const modifyAnimation = (mode) => {
  if (mode === "start") {
    if (c) {
      return;
    }

    c = setInterval(timer, 10);
    tagline.innerHTML = `STARTED...`;
    tagline.style.color = "green";
    tagline.style.borderColor = "green";
  }

  if (mode === "pause") {
    timestamp = `TIMESTAMP: ${hours} HH, ${minutes} MM, ${seconds} SS.`;
    tagline.innerHTML = tagline.innerHTML + "<br>" + timestamp;
    tagline.style.color = "deepskyblue";
    tagline.style.borderColor = "deepskyblue";
  }

  if (mode === "stop") {
    clearInterval(c);
    c = undefined;
    start.innerHTML = "RESTART";
    tagline.innerHTML = `STOP AT: ${hours} HH, ${minutes} MM, ${seconds} SS.`;
    tagline.style.color = "red";
    tagline.style.borderColor = "red";
  }
  if (mode === "reset") {
    clearInterval(c);
    c = undefined;
    start.innerHTML = "START";
    hours = 0;
    minutes = 0;
    seconds = 0;
    mseconds = 0;
    phours.innerHTML = hours + "0";
    pminutes.innerHTML = minutes + "0";
    pseconds.innerHTML = seconds + "0";
    pmseconds.innerHTML = mseconds + "0";
    tagline.innerHTML = "HIT START..!";
    tagline.style.color = "rgba(0,0,0,0.5)";
    tagline.style.borderColor = "black";
  }
};

start.addEventListener("click", () => {
  if (start.innerHTML == "START" || start.innerHTML == "RESUME") {
    modifyAnimation("start");
  } else if (start.innerHTML == "RESTART") {
    hours = 0;
    minutes = 0;
    seconds = 0;
    mseconds = 0;
    modifyAnimation("start");
  }
});
pause.addEventListener("click", () => modifyAnimation("pause"));
stop.addEventListener("click", () => modifyAnimation("stop"));
reset.addEventListener("click", () => modifyAnimation("reset"));
