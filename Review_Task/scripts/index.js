var score = 0;
var index_list = [];
var cards_open = 0;
var click_counter = 0;
var seconds = 0;
var hours = 0;
var minutes = 0;
var mseconds = 0;
var c;
var finalscore = 0;
var typee = "images";
onload = twobythree;

card1 = document.querySelectorAll(".card1");
wrapper = document.querySelectorAll("#wrapper");
card_list = document.querySelectorAll(".card");
top_list = document.querySelectorAll(".card-top");
back_list = document.querySelectorAll(".card-back");
scoreele = document.querySelectorAll("#score");
dminutes = document.getElementById("dminutes");
dseconds = document.getElementById("dseconds");

contentlist = [];

function cardlogic(finalscore) {
  card_list.forEach((item, index) => {
    item.addEventListener("click", () => {
      cards_open += 1;
      if (back_list[index].classList.contains("active")) {
        alert("Already Open");
        return;
      }
      top_list[index].classList.add("hide");
      back_list[index].classList.remove("hide");
      back_list[index].classList.add("show");
      back_list[index].classList.add("active");

      index_list.push(index);

      if (click_counter == 1) {
        if (
          back_list[index_list[0]].getAttribute("src") ===
          back_list[index_list[1]].getAttribute("src")
        ) {
          top_list[index_list[0]].classList.add("hide");
          back_list[index_list[0]].classList.remove("hide");
          back_list[index_list[0]].classList.add("show");

          top_list[index_list[1]].classList.add("hide");
          back_list[index_list[1]].classList.remove("hide");
          back_list[index_list[1]].classList.add("show");

          score += 10;
          index_list = [];
        } else {
          asyncCall();
        }

        click_counter = 0;
      }
      click_counter += 1;

      document.getElementById("score").innerHTML = `${score}`;
      document.getElementById("copen").innerHTML = `${cards_open}`;

      modifyTimer("start");

      if (score === finalscore) {
        alert(" Congratulations! You win !!! \n Score:" + score+"\n Time taken: "+"M:"+minutes+" S:"+seconds+"\n Total Cards Opened: " + cards_open);

        modifyTimer("reset");
      }
    });
  });
}
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
  dminutes.innerHTML = minutes < 10 ? "0" + minutes : minutes;
  dseconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;
}

const modifyTimer = (mode) => {
  if (mode === "start") {
    if (c) {
      return;
    }
    c = setInterval(timer, 10);
  }

  if (mode === "reset") {
    clearInterval(c);
    c = undefined;
    hours = 0;
    minutes = 0;
    seconds = 0;
    dminutes.innerHTML = minutes < 10 ? "0" + minutes : minutes;
    dseconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;
  }
};

function resetGame() {
  modifyTimer("reset");
  score = 0;
  cards_open = 0;
  dminutes.innerHTML = minutes < 10 ? "0" + minutes : minutes;
  dseconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;
  document.getElementById("score").innerHTML = `${score}`;
  document.getElementById("copen").innerHTML = `${cards_open}`;
  top_list.forEach((item) => {
    item.classList.remove("hide");
  });
  back_list.forEach((item) => {
    item.classList.add("hide");
    item.classList.remove("show");
    item.classList.remove("active");
  });
}

function twobythree() {
  finalscore = 30;
  wrapper.forEach((item) => {
    item.innerHTML =
      '<div class="c1">' +
      '<div class="container1" id="allcards">' +
      '<div class="card1 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card1">' +
      '<img class="card-back" src="./assets/card1.jpg" alt="card1" name="tree" id="card1">' +
      "</div>" +
      '<div class="card2 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card2">' +
      '<img class="card-back" src="./assets/card2.jpg" alt="card2" name="night-tree" id="card2">' +
      "</div>" +
      '<div class="card3 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card3">' +
      '<img class="card-back" src="./assets/card1.jpg" alt="card1" name="tree" id="card1_2">' +
      "</div>" +
      '<div class="card4 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card4">' +
      '<img class="card-back" src="./assets/card2.jpg" alt="card2" name="night-tree" id="card2_2">' +
      "</div>" +
      '<div class="card5 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card5">' +
      '<img class="card-back" src="./assets/card3.jpg" name="stairs" id="card3">' +
      "</div>" +
      '<div class="card6 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card6">' +
      '<img class="card-back" src="./assets/card3.jpg" name="stairs" id="card3_2">' +
      "</div>" +
      "</div>" +
      "</div>";
  });

  wrapper = document.querySelectorAll("#wrapper");
  card_list = document.querySelectorAll(".card");
  top_list = document.querySelectorAll(".card-top");
  back_list = document.querySelectorAll(".card-back");
  scoreele = document.querySelectorAll("#score");
  dminutes = document.getElementById("dminutes");
  dseconds = document.getElementById("dseconds");
  resetGame();
  cardlogic(finalscore);
  selecttwobythree(typee);
}

function threebyfour() {
  finalscore = 60;
  wrapper.forEach((item) => {
    item.innerHTML =
      '<div class="c1">' +
      '<div class="container2" id="allcards">' +
      '<div class="card1 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card1">' +
      '<img class="card-back" src="./assets/card1.jpg" alt="card1" name="tree" id="mchild1">' +
      "</div>" +
      '<div class="card2 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card2">' +
      '<img class="card-back" src="./assets/card2.jpg" alt="card1" name="night-tree" id="mchild2">' +
      "</div>" +
      '<div class="card3 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card3">' +
      '<img class="card-back" src="./assets/card1.jpg" alt="card1" name="tree" id="mchild1_1">' +
      "</div>" +
      '<div class="card4 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card4">' +
      '<img class="card-back" src="./assets/card2.jpg" alt="card1" name="night-tree" id="mchild2_2">' +
      "</div>" +
      '<div class="card5 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card5">' +
      '<img class="card-back" src="./assets/card3.jpg" alt="card1" name="stairs" id="mchild3">' +
      "</div>" +
      '<div class="card6 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card6">' +
      '<img class="card-back" src="./assets/card4.jpg" alt="card1" name="mountain" id="mchild4">' +
      "</div>" +
      '<div class="card7 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card7">' +
      '<img class="card-back" src="./assets/card3.jpg" alt="card1" name="stairs" id="mchild3_3"> ' +
      "</div>" +
      '<div class="card8 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card8">' +
      '<img class="card-back" src="./assets/card4.jpg" alt="card1" name="mountain" id="mchild4_4">' +
      "</div>" +
      '<div class="card9 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card9">' +
      '<img class="card-back" src="./assets/card5.jpg" alt="card1" name="boat" id="mchild5">' +
      "</div>" +
      '<div class="card10 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card10">' +
      '<img class="card-back" src="./assets/card6.jpg" alt="card1" name="taj" id="mchild6">' +
      "</div>" +
      '<div class="card11 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card11">' +
      '<img class="card-back" src="./assets/card5.jpg" alt="card1" name="boat" id="mchild5_5">' +
      "</div>" +
      '<div class="card12 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card12">' +
      '<img class="card-back" src="./assets/card6.jpg" alt="card1" name="taj" id="mchild6_6">' +
      "</div>" +
      "</div>" +
      "</div>";
  });
  allcards = document.querySelectorAll("#allcards");
  wrapper = document.querySelectorAll("#wrapper");
  card_list = document.querySelectorAll(".card");
  top_list = document.querySelectorAll(".card-top");
  back_list = document.querySelectorAll(".card-back");
  scoreele = document.querySelectorAll("#score");
  dminutes = document.getElementById("dminutes");
  dseconds = document.getElementById("dseconds");
  resetGame();
  cardlogic(finalscore);
  selectthreebyfour(typee);
}

function fourbyfive() {
  finalscore = 100;
  wrapper.forEach((item) => {
    item.innerHTML =
      '<div class="c1">' +
      '<div class="container3" id="allcards">' +
      '<div class="card1 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card1">' +
      '<img class="card-back" src="./assets/card1.jpg" alt="card1" name="tree" id="lchild1">' +
      "</div>" +
      '<div class="card2 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card2">' +
      '<img class="card-back" src="./assets/card2.jpg" alt="card1" name="night-tree" id="lchild2">' +
      "</div>" +
      '<div class="card3 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card3">' +
      '<img class="card-back" src="./assets/card1.jpg" alt="card1" name="tree" id="lchild1_1">' +
      "</div>" +
      '<div class="card4 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card4">' +
      '<img class="card-back" src="./assets/card2.jpg" alt="card1" name="night-tree" id="lchild2_2">' +
      "</div>" +
      '<div class="card5 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card5">' +
      '<img class="card-back" src="./assets/card3.jpg" alt="card1" name="stairs" id="lchild3">' +
      "</div>" +
      '<div class="card6 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card6">' +
      '<img class="card-back" src="./assets/card4.jpg" alt="card1" name="mountain" id="lchild4">' +
      "</div>" +
      '<div class="card7 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card7">' +
      '<img class="card-back" src="./assets/card3.jpg" alt="card1" name="stairs" id="lchild3_3">' +
      "</div>" +
      '<div class="card8 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card8">' +
      '<img class="card-back" src="./assets/card4.jpg" alt="card1" name="mountain" id="lchild4_4">' +
      "</div>" +
      '<div class="card9 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card9">' +
      '<img class="card-back" src="./assets/card5.jpg" alt="card1" name="boat" id="lchild5">' +
      "</div>" +
      '<div class="card10 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card10">' +
      '<img class="card-back" src="./assets/card6.jpg" alt="card1" name="taj" id="lchild6">' +
      "</div>" +
      '<div class="card11 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card11">' +
      '<img class="card-back" src="./assets/card5.jpg" alt="card1" name="boat" id="lchild5_5">' +
      "</div>" +
      '<div class="card12 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card12">' +
      '<img class="card-back" src="./assets/card6.jpg" alt="card1" name="taj" id="lchild6_6">' +
      "</div>" +
      '<div class="card13 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card12">' +
      '<img class="card-back" src="./assets/card7.jpg" alt="card1" name="nightboat" id="lchild7">' +
      "</div>" +
      '<div class="card14 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card12">' +
      '<img class="card-back" src="./assets/card8.jpg" alt="card1" name="valley" id="lchild8">' +
      "</div>" +
      '<div class="card15 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card12">' +
      '<img class="card-back" src="./assets/card7.jpg" alt="card1" name="nightboat" id="lchild7_7">' +
      "</div>" +
      '<div class="card16 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card12">' +
      '<img class="card-back" src="./assets/card8.jpg" alt="card1" name="valley" id="lchild8_8">' +
      "</div>" +
      '<div class="card17 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card12">' +
      '<img class="card-back" src="./assets/card9.jpg" alt="card1" name="mountain" id="lchild9">' +
      "</div>" +
      '<div class="card18 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card12">' +
      '<img class="card-back" src="./assets/card10.jpg" id="lchild10" alt="card10" name="ring" >' +
      "</div>" +
      '<div class="card19 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card12">' +
      '<img class="card-back" src="./assets/card9.jpg" alt="card1" name="mountain" id="lchild9_9">' +
      "</div>" +
      '<div class="card20 card">' +
      '<img class="card-top" src="./assets/question.svg" alt="card12">' +
      '<img class="card-back" src="./assets/card10.jpg" alt="card1" name="ring" id="lchild10_10">' +
      "</div>" +
      "</div>" +
      "</div>";
  });
  allcards = document.querySelectorAll("#allcards");
  wrapper = document.querySelectorAll("#wrapper");
  card_list = document.querySelectorAll(".card");
  top_list = document.querySelectorAll(".card-top");
  back_list = document.querySelectorAll(".card-back");
  scoreele = document.querySelectorAll("#score");
  dminutes = document.getElementById("dminutes");
  dseconds = document.getElementById("dseconds");
  resetGame();
  cardlogic(finalscore);
  selectfourbyfive(typee);
}

function inputSelected(type) {
  typee = type.toString();
}

function selecttwobythree(type) {
  if (type === "color") {
    resetGame();

    document.getElementById("card1").src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEX/AAAZ4gk3AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=";
    document.getElementById("card1_2").src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEX/AAAZ4gk3AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=";
    document.getElementById("card2").src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEUAAP79f+LBAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=";
    document.getElementById("card2_2").src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEUAAP79f+LBAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=";
    document.getElementById("card3").src =
      "https://www.colorpsychology.org/wp-content/uploads/2015/02/green-1.png";
    document.getElementById("card3_2").src =
      "https://www.colorpsychology.org/wp-content/uploads/2015/02/green-1.png";
  } else if (type === "icon") {
    document.getElementById("card1").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f4c9.png";
    document.getElementById("card1_2").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f4c9.png";
    document.getElementById("card2").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f601.png";
    document.getElementById("card2_2").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f601.png";
    document.getElementById("card3").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f979.png";
    document.getElementById("card3_2").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f979.png";
    resetGame();
  } else if (type === "images") {
    document.getElementById("card1").src = "./assets/card1.jpg";
    document.getElementById("card1_2").src = "./assets/card1.jpg";
    document.getElementById("card2").src = "./assets/card2.jpg";
    document.getElementById("card2_2").src = "./assets/card2.jpg";
    document.getElementById("card3").src = "./assets/card3.jpg";
    document.getElementById("card3_2").src = "./assets/card3.jpg";
    resetGame();
  }
}

function selectthreebyfour(type) {
  if (type === "color") {
    resetGame();

    document.getElementById("mchild1").src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEX/AAAZ4gk3AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=";
    document.getElementById("mchild1_1").src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEX/AAAZ4gk3AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=";
    document.getElementById("mchild2").src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEUAAP79f+LBAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=";
    document.getElementById("mchild2_2").src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEUAAP79f+LBAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=";
    document.getElementById("mchild3").src =
      "https://www.colorpsychology.org/wp-content/uploads/2015/02/green-1.png";
    document.getElementById("mchild3_3").src =
      "https://www.colorpsychology.org/wp-content/uploads/2015/02/green-1.png";

    document.getElementById("mchild4").src =
      "https://htmlcolorcodes.com/assets/images/colors/neon-pink-color-solid-background-1920x1080.png";
    document.getElementById("mchild4_4").src =
      "https://htmlcolorcodes.com/assets/images/colors/neon-pink-color-solid-background-1920x1080.png";
    document.getElementById("mchild5").src =
      "https://htmlcolorcodes.com/assets/images/colors/violet-color-solid-background-1920x1080.png";
    document.getElementById("mchild5_5").src =
      "https://htmlcolorcodes.com/assets/images/colors/violet-color-solid-background-1920x1080.png";
    document.getElementById("mchild6").src =
      "https://media.istockphoto.com/id/1136397001/photo/stainless-steel-texture-background-shiny-surface-of-metal-sheet.jpg?b=1&s=170667a&w=0&k=20&c=mKih59_2_s2TIrx8b9dPpsLcfzibbo2_RLBLJodtg_M=";
    document.getElementById("mchild6_6").src =
      "https://media.istockphoto.com/id/1136397001/photo/stainless-steel-texture-background-shiny-surface-of-metal-sheet.jpg?b=1&s=170667a&w=0&k=20&c=mKih59_2_s2TIrx8b9dPpsLcfzibbo2_RLBLJodtg_M=";
  } else if (type === "icon") {
    document.getElementById("mchild1").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f4c9.png";
    document.getElementById("mchild1_1").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f4c9.png";
    document.getElementById("mchild2").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f601.png";
    document.getElementById("mchild2_2").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f601.png";
    document.getElementById("mchild3").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f979.png";
    document.getElementById("mchild3_3").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f979.png";
    document.getElementById("mchild4").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f976.png";
    document.getElementById("mchild4_4").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f976.png";
    document.getElementById("mchild5").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f975.png";
    document.getElementById("mchild5_5").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f975.png";
    document.getElementById("mchild6").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f62f.png";
    document.getElementById("mchild6_6").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f62f.png";
    resetGame();
  } else if (type === "images") {
    document.getElementById("mchild1").src = "./assets/card1.jpg";
    document.getElementById("mchild1_1").src = "./assets/card1.jpg";
    document.getElementById("mchild2").src = "./assets/card2.jpg";
    document.getElementById("mchild2_2").src = "./assets/card2.jpg";
    document.getElementById("mchild3").src = "./assets/card3.jpg";
    document.getElementById("mchild3_3").src = "./assets/card3.jpg";
    document.getElementById("mchild4").src = "./assets/card4.jpg";
    document.getElementById("mchild4_4").src = "./assets/card4.jpg";
    document.getElementById("mchild5").src = "./assets/card5.jpg";
    document.getElementById("mchild5_5").src = "./assets/card5.jpg";
    document.getElementById("mchild6").src = "./assets/card6.jpg";
    document.getElementById("mchild6_6").src = "./assets/card6.jpg";
    resetGame();
  }
}

function selectfourbyfive(type) {
  if (type === "color") {
    resetGame();

    document.getElementById("lchild1").src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEX/AAAZ4gk3AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=";
    document.getElementById("lchild1_1").src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEX/AAAZ4gk3AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=";
    document.getElementById("lchild2").src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEUAAP79f+LBAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=";
    document.getElementById("lchild2_2").src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEUAAP79f+LBAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=";
    document.getElementById("lchild3").src =
      "https://www.colorpsychology.org/wp-content/uploads/2015/02/green-1.png";
    document.getElementById("lchild3_3").src =
      "https://www.colorpsychology.org/wp-content/uploads/2015/02/green-1.png";
    document.getElementById("lchild4").src =
      "https://htmlcolorcodes.com/assets/images/colors/neon-pink-color-solid-background-1920x1080.png";
    document.getElementById("lchild4_4").src =
      "https://htmlcolorcodes.com/assets/images/colors/neon-pink-color-solid-background-1920x1080.png";
    document.getElementById("lchild5").src =
      "https://htmlcolorcodes.com/assets/images/colors/violet-color-solid-background-1920x1080.png";
    document.getElementById("lchild5_5").src =
      "https://htmlcolorcodes.com/assets/images/colors/violet-color-solid-background-1920x1080.png";
    document.getElementById("lchild6").src =
      "https://media.istockphoto.com/id/1136397001/photo/stainless-steel-texture-background-shiny-surface-of-metal-sheet.jpg?b=1&s=170667a&w=0&k=20&c=mKih59_2_s2TIrx8b9dPpsLcfzibbo2_RLBLJodtg_M=";
    document.getElementById("lchild6_6").src =
      "https://media.istockphoto.com/id/1136397001/photo/stainless-steel-texture-background-shiny-surface-of-metal-sheet.jpg?b=1&s=170667a&w=0&k=20&c=mKih59_2_s2TIrx8b9dPpsLcfzibbo2_RLBLJodtg_M=";
    document.getElementById("lchild7").src =
      "https://htmlcolorcodes.com/assets/images/colors/cyan-color-solid-background-1920x1080.png";
    document.getElementById("lchild7_7").src =
      "https://htmlcolorcodes.com/assets/images/colors/cyan-color-solid-background-1920x1080.png";
    document.getElementById("lchild8").src =
      "https://htmlcolorcodes.com/assets/images/colors/pastel-yellow-color-solid-background-1920x1080.png";
    document.getElementById("lchild8_8").src =
      "https://htmlcolorcodes.com/assets/images/colors/pastel-yellow-color-solid-background-1920x1080.png";
    document.getElementById("lchild9").src =
      "https://img.freepik.com/free-photo/abstract-luxury-gold-yellow-gradient-studio-wall-well-use-as-background-layout-banner-product-presentation_1258-56105.jpg";
    document.getElementById("lchild9_9").src =
      "https://img.freepik.com/free-photo/abstract-luxury-gold-yellow-gradient-studio-wall-well-use-as-background-layout-banner-product-presentation_1258-56105.jpg";
    document.getElementById("lchild10").src =
      "https://www.macmillandictionary.com/external/slideshow/full/Magenta_full.png";
    document.getElementById("lchild10_10").src =
      "https://www.macmillandictionary.com/external/slideshow/full/Magenta_full.png";
  } else if (type === "icon") {
    document.getElementById("lchild1").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f4c9.png";
    document.getElementById("lchild1_1").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f4c9.png";
    document.getElementById("lchild2").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f601.png";
    document.getElementById("lchild2_2").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f601.png";
    document.getElementById("lchild3").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f979.png";
    document.getElementById("lchild3_3").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f979.png";
    document.getElementById("lchild4").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f976.png";
    document.getElementById("lchild4_4").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f976.png";
    document.getElementById("lchild5").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f975.png";
    document.getElementById("lchild5_5").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f975.png";
    document.getElementById("lchild6").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f62f.png";
    document.getElementById("lchild6_6").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f62f.png";
    document.getElementById("lchild7").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f60e.png";
    document.getElementById("lchild7_7").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f60e.png";
    document.getElementById("lchild8").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f927.png";
    document.getElementById("lchild8_8").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f927.png";
    document.getElementById("lchild9").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f92f.png";
    document.getElementById("lchild9_9").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f92f.png";
    document.getElementById("lchild10").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f635-200d-1f4ab.png";
    document.getElementById("lchild10_10").src =
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f635-200d-1f4ab.png";
    resetGame();
  } else if (type === "images") {
    document.getElementById("lchild1").src = "./assets/card1.jpg";
    document.getElementById("lchild1_1").src = "./assets/card1.jpg";
    document.getElementById("lchild2").src = "./assets/card2.jpg";
    document.getElementById("lchild2_2").src = "./assets/card2.jpg";
    document.getElementById("lchild3").src = "./assets/card3.jpg";
    document.getElementById("lchild3_3").src = "./assets/card3.jpg";
    document.getElementById("lchild4").src = "./assets/card4.jpg";
    document.getElementById("lchild4_4").src = "./assets/card4.jpg";
    document.getElementById("lchild5").src = "./assets/card5.jpg";
    document.getElementById("lchild5_5").src = "./assets/card5.jpg";
    document.getElementById("lchild6").src = "./assets/card6.jpg";
    document.getElementById("lchild6_6").src = "./assets/card6.jpg";
    document.getElementById("lchild7").src = "./assets/card7.jpg";
    document.getElementById("lchild7_7").src = "./assets/card7.jpg";
    document.getElementById("lchild8").src = "./assets/card8.jpg";
    document.getElementById("lchild8_8").src = "./assets/card8.jpg";
    document.getElementById("lchild9").src = "./assets/card9.jpg";
    document.getElementById("lchild9_9").src = "./assets/card9.jpg";
    document.getElementById("lchild10").src = "./assets/card10.jpg";
    document.getElementById("lchild10_10").src = "./assets/card10.jpg";
    resetGame();
  }
}

function randomise() {
  if (typee == "images") {
    var imgArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    var basePath = "./assets/card";
    var unique = [];
    for (var i = 0; i < back_list.length / 2; i++) {
      var rand = imgArray[Math.floor(Math.random() * imgArray.length)];
      unique.push(rand);
    }

    var c = 0;
    back_list.forEach((item) => {
      if (c == unique.length) {
        c = 0;
      }
      console.log(unique);
      item.src = basePath + unique[c] + ".jpg";
      c++;
    });
    resetGame();
  } else if (typee == "color") {
    var imgArray = [
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEX/AAAZ4gk3AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEUAAP79f+LBAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=",
      "https://www.colorpsychology.org/wp-content/uploads/2015/02/green-1.png",
      "https://htmlcolorcodes.com/assets/images/colors/neon-pink-color-solid-background-1920x1080.png",
      "https://htmlcolorcodes.com/assets/images/colors/violet-color-solid-background-1920x1080.png",
      "https://htmlcolorcodes.com/assets/images/colors/violet-color-solid-background-1920x1080.png",
      "https://media.istockphoto.com/id/1136397001/photo/stainless-steel-texture-background-shiny-surface-of-metal-sheet.jpg?b=1&s=170667a&w=0&k=20&c=mKih59_2_s2TIrx8b9dPpsLcfzibbo2_RLBLJodtg_M=",
      "https://htmlcolorcodes.com/assets/images/colors/pastel-yellow-color-solid-background-1920x1080.png",
      "https://img.freepik.com/free-photo/abstract-luxury-gold-yellow-gradient-studio-wall-well-use-as-background-layout-banner-product-presentation_1258-56105.jpg",
      "https://www.macmillandictionary.com/external/slideshow/full/Magenta_full.png",
    ];
    var unique = [];
    for (var i = 0; i < back_list.length / 2; i++) {
      var rand = imgArray[Math.floor(Math.random() * imgArray.length)];
      unique.push(rand);
    }

    var c = 0;
    back_list.forEach((item) => {
      if (c == unique.length) {
        c = 0;
      }
      console.log(unique);
      item.src = unique[c];
      c++;
    });
    resetGame();
  } else if (typee == "icon") {
    var imgArray = [
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f4c9.png",
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f601.png",
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f979.png",
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f976.png",
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f975.png",
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f62f.png",
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f60e.png",
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f927.png",
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f92f.png",
      "https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f635-200d-1f4ab.png",
    ];
    var unique = [];
    for (var i = 0; i < back_list.length / 2; i++) {
      var rand = imgArray[Math.floor(Math.random() * imgArray.length)];
      unique.push(rand);
    }

    var c = 0;
    back_list.forEach((item) => {
      if (c == unique.length) {
        c = 0;
      }
      console.log(unique);
      item.src = unique[c];
      c++;
    });
    resetGame();
  }
}

var themevalue = false;
function theme() {
  themevalue = !themevalue;
  if (themevalue === true) {
    document.body.style.background = "#fff942";
  } else {
    document.body.style.background = "white";
  }
}

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(hide());
    }, 1000);
  });
}

async function asyncCall() {
  const result = await resolveAfter2Seconds();
}

function hide() {
  top_list[index_list[0]].classList.remove("hide");
  back_list[index_list[0]].classList.add("hide");
  back_list[index_list[0]].classList.remove("show");
  top_list[index_list[1]].classList.remove("hide");
  back_list[index_list[1]].classList.add("hide");
  back_list[index_list[1]].classList.remove("show");
  back_list[index_list[0]].classList.remove("active");
  back_list[index_list[1]].classList.remove("active");

  index_list = [];
}
