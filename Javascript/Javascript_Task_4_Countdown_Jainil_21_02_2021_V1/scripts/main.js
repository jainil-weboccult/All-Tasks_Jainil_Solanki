var seconds = 0;
var hours = 0;
var minutes = 0;
var mseconds = 0;
var totalMinutevar = 0;
var values = document.getElementById("inputt");
var input = 0;
var c;
onload = getvalue();
function getvalue() {
  input = values.value;
  totalMinutes = Math.floor(input / 60);
  seconds = input % 60;
  
  hours = Math.floor(totalMinutes / 60);
  minutes = totalMinutes % 60;
  mseconds = 100;
  console.log(hours, minutes,seconds, mseconds);
}

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
  if (hours == 0 && minutes == 0 && seconds == 0 && mseconds == 0) {
    return;
  } 
  else if (mseconds == 0) {
    mseconds = 99;
    seconds--;
  } else if (hours == 0 && minutes == 0) {
    hours = 0;
    minutes = 0;
  } else if (hours > 0 && minutes == 0) {
    hours--;
    minutes = 60;
  }
  else if (seconds == 0) {
    seconds = 59;
    minutes--;
  } else if (minutes == 0) {
    minutes = 60;
    hours--;
  } else if (hours == 0) {
    hours = 0;
  }
  mseconds--;
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
    clearInterval(c);
    c = undefined;
    start.innerHTML = "RESUME";
    tagline.innerHTML = `PAUSE AT: ${hours} HH, ${minutes} MM, ${seconds} SS.`;
    tagline.style.color = "deepskyblue";
    tagline.style.borderColor = "deepskyblue";
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
    tagline.innerHTML = "ENTER TIME & HIT START..!";
    tagline.style.color = "rgba(0,0,0,0.5)";
    tagline.style.borderColor = "black";
    getvalue();
  }

  if (mode === "stop") {
    clearInterval(c);
    c = undefined;
    start.innerHTML = "RESTART";
    tagline.innerHTML = `STOP AT: ${hours} HH, ${minutes} MM, ${seconds} SS.`;
    tagline.style.color = "red";
    tagline.style.borderColor = "red";
  }
};

start.addEventListener("click", () => {
  if (hours <= 0 && minutes <= 0 && seconds <= 0) {
    alert("Input Empty OR Negative Input ");
    return;
  } else {
    if (start.innerHTML == "START" || start.innerHTML == "RESUME") {
      modifyAnimation("start");
    } else if (start.innerHTML == "RESTART") {
      getvalue();
      modifyAnimation("start");
    }
  }
});
pause.addEventListener("click", () => modifyAnimation("pause"));
stop.addEventListener("click", () => modifyAnimation("stop"));
reset.addEventListener("click", () => modifyAnimation("reset"));
