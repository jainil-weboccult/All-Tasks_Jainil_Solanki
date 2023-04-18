var btn_list = document.querySelectorAll(".btn");
var form_list = document.querySelectorAll(".form");
var save = document.querySelectorAll(".save");
var previous = document.querySelectorAll(".prev");
var table = document.querySelectorAll("#table");

var gender
var indexx = 0;
let length = form_list.length;
var validEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

var c = 0;

var firstname = document.getElementById("first_name");
var lastname = document.getElementById("last_name");
var email = document.getElementById("email");
var contact = document.getElementById("contact");
var dob = document.getElementById("dob");
var fsports = document.getElementById("fsports");
var about = document.getElementById("about");
var terms = document.getElementById("terms");



save[0].forEach((item) => {
  item.addEventListener("click", () => {

    if (item.innerHTML == "SUBMIT") {
      if (document.getElementById("Male").checked) {
        gender = "Male";
      } else {
        gender = "Female";
      }
      if (firstname.value == "") {
        alert("Please enter details in first name field and submit again");
      }
      if (lastname.value == "") {
        alert("Please enter details in last name field and submit again");
      }
      if (email.value == "") {
        alert("Please enter details in email field and submit again");
      }
      if (!email.value.match(validEmail)) {
        alert("email field must contain @ please re-enter and submit again");
      }
      if (contact.value == "") {
        alert("Please enter details in contact number field and submit again");
      }
      if (dob.value == "") {
        alert("Please enter details in date of birth field and submit again");
      }
      if (about.value == "") {
        alert("Please enter details in about field and submit again");
      }
      if (terms.checked == false) {
        alert(
          "Please check the I accept the Terms and Condition and submit again"
        );
      } else {
        alert("Submitted Successfully");
        c++;
        table.forEach((item) => {
          item.innerHTML =
            item.innerHTML +
            "<tr>" +
            "<td>" +
            c +
            "</td>" +
            "<td>" +
            firstname.value +
            "</td>" +
            "<td>" +
            lastname.value +
            "</td>" +
            "<td>" +
            gender +
            "</td>" +
            "<td>" +
            email.value +
            "</td>" +
            "<td>" +
            contact.value +
            "</td>" +
            "<td>" +
            dob.value +
            "</td>" +
            "<td>" +
            fsports.value +
            "</td>" +
            "<td>" +
            about.value +
            "</td>" +
            "<td>" +
            "Accepted" +
            "</td>" +
            "<td>" +
            "<a href='#' class='Edit'>Edit</a>" +
            "</td>" +
            "<td>" +
            "<a href='#' class='Delete' onclick='SomeDeleteRowFunction(this)'>Delete</a>" +
            "</td>" +
            "</tr>";
        });

        firstname.value = "";
        lastname.value = "";
        email.value = "";
        contact.value = "";
        dob.value = "";
        about.value = "";
        terms.checked = false;
        document.getElementById("Male").checked = false;
        document.getElementById("Female").checked = false;
        btn_list.forEach((item) => item.classList.remove("active"));
        btn_list[0].classList.add("active");
        form_list.forEach((item) => {
          item.classList.remove("show"); item.classList.add("hide")
        });
        form_list[0].classList.add("show");
        form_list[0].classList.remove("hide");
        save[0].innerHTML = "SAVE & NEXT";
        indexx = 0;
      }

      return;
    }
    indexx++;

    btn_list.forEach((item) => item.classList.remove("active"));
    btn_list[indexx].classList.add("active");

    form_list.forEach((item) => {
      item.classList.remove("show"); item.classList.add("hide");
    });

    form_list[indexx].classList.add("show");
    form_list[indexx].classList.remove("hide");
    console.log(indexx);
    previous[0].classList.add("show");
    previous[0].classList.add("remove");

    if (indexx == length - 1) {
      item.innerHTML = "SUBMIT";
    }
  });
});

previous.forEach((item) => {
  item.addEventListener("click", () => {
    indexx--;
    if (indexx == 0) {
      save[0].innerHTML = "SAVE & NEXT";
      item.classList.remove("show");
      item.classList.add("hide");
      btn_list.forEach((item) => item.classList.remove("active"));
      btn_list[indexx].classList.add("active");

      form_list.forEach((item) => {
        item.classList.remove("show"); item.classList.add("hide");
      });

      form_list[indexx].classList.add("show");
      form_list[indexx].classList.remove("hide");
      console.log(indexx);
    } else {
      save[0].innerHTML = "SAVE & NEXT";
      btn_list.forEach((item) => item.classList.remove("active"));
      btn_list[indexx].classList.add("active");

      form_list.forEach((item) => {
        item.classList.remove("show"); item.classList.add("hide");
      });

      form_list[indexx].classList.add("show");
      form_list[indexx].classList.remove("hide");
      console.log(indexx);
    }
  });
});



// function SomeDeleteRowFunction(o) {
//   var td = o.parentNode.parentNode.parentNode;
//   td.removeChild(o.parentNode.parentNode);
// }


