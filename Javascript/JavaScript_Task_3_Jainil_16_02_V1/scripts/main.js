let slideIndex = 0;
slider();
animation();
onload = () => modifyAnimation("start")
btn_list = document.querySelectorAll(".dot");
img_list = document.querySelectorAll(".img");
length = img_list.length;

function slider() {
  btn_list = document.querySelectorAll(".dot");
  img_list = document.querySelectorAll(".img");
  btn_list.forEach((item, index) => {
    item.addEventListener("click", () => {
      btn_list.forEach((item) => {
        item.classList.remove("active");
      });
      item.classList.add("active");
      img_list.forEach((content) => {
        content.classList.add("hide"), content.classList.remove("show");
      });
      img_list[index].classList.remove("hide");
      img_list[index].classList.add("show");
    });
  });
}
var c;
function animation() {
  let i;
  for (i = 0; i < img_list.length; i++) {
    img_list[i].classList.remove("show");
    img_list[i].classList.add("hide");
  }

  slideIndex++;
  if (slideIndex > img_list.length) {
    slideIndex = 1;
  }

  for (i = 0; i < btn_list.length; i++) {
    btn_list[i].classList.remove("active");
  }
  img_list[slideIndex - 1].classList.add("show");
  btn_list[slideIndex - 1].classList.add("active");
}

const modifyAnimation = (mode) => {
  if ( mode === "start"){
    if(c){
      return;
    }
    c = setInterval(animation, 2000);
  }

  if(mode === "stop"){
    clearInterval(c);
    c = undefined;
  }
}

play = document.querySelector("#play");
pause = document.querySelector("#pause");

play.addEventListener("click", () => modifyAnimation("start"));
pause.addEventListener("click", () => modifyAnimation("stop"));

slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("img");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.add("hide");
    slides[i].classList.remove("show");
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].classList.add("show");
  slides[slideIndex - 1].classList.remove("hide");
  dots[slideIndex - 1].className += " active";
}
