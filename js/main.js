// aside settings
document.querySelector("aside div").onclick = function () {
  document.querySelector("aside div .fa-gear").classList.toggle("fa-spin");
  document.querySelector("aside").classList.toggle("open");
};

// switch Colors
let liColor = document.querySelectorAll("aside .settings-options ul li"),
  mainColor = localStorage.getItem("colors-options");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  liColor.forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

liColor.forEach((li) => {
  li.onclick = (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    window.localStorage.setItem("colors-options", e.target.dataset.color);
    removeActiveClass(e);
  };
});

// switch background
let backgroundRandom = document.querySelectorAll(
    "aside .random-background span"
  ),
  backgroundOption = true,
  backgroundInterval,
  mainBack = localStorage.getItem("background-option");

if (mainBack !== null) {
  if (mainBack === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  backgroundRandom.forEach((ele) => {
    ele.classList.remove("active");
  });
  if (mainBack === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

backgroundRandom.forEach((span) => {
  span.onclick = (e) => {
    removeActiveClass(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      backgroundswitch();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  };
});

// burger-menu
let menu = document.querySelector(".burger-menu"),
  spans = document.querySelectorAll(".container .burger-menu span"),
  nav = document.querySelector(".container nav");

menu.onclick = () => {
  spans[0].classList.toggle("axe-r");
  spans[1].classList.toggle("hidden");
  spans[2].classList.toggle("axe-l");
  nav.classList.toggle("visble");
};

// random landing bage
let landingBage = document.querySelector(".landing"),
  landingImages = [
    "landing-1.jpg",
    "landing-2.jpg",
    "landing-3.jpg",
    "landing-4.jpg",
    "landing-5.jpg",
  ];

function backgroundswitch() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let genrat = Math.floor(Math.random() * landingImages.length);
      landingBage.style.backgroundImage =
        'url("images/' + landingImages[genrat] + '")';
    }, 10000);
  }
}
backgroundswitch();

// swap our skills
let progress = document.querySelector(".progress");

window.onscroll = () => {
  if (
    window.pageYOffset >
    progress.offsetTop + progress.offsetHeight - window.innerHeight
  ) {
    let skills = document.querySelectorAll(
      ".progress .main-content .prog-skills span"
    );
    skills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// popup our gallery
let imgs = document.querySelectorAll(".gallery .images img");

imgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overLaye = document.createElement("div");
    overLaye.className = "popup-overlaye";
    document.body.appendChild(overLaye);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);
    document.body.appendChild(popupBox);
    let close = document.createElement("span");
    close.className = "close-buttom";
    close.innerHTML = "X";
    popupBox.appendChild(close);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className == "close-buttom") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlaye").remove();
  }
});

// scroll any where in page

let bullets = document.querySelectorAll(".nav-bar .bullet"),
  links = document.querySelectorAll(".landing nav ul li");

function scrollToSection(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(bullets);
scrollToSection(links);

// remove active class

function removeActiveClass(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// swich nav bar options
let navBarSett = document.querySelectorAll(
    "aside .settings-options .nav-bar-options span"
  ),
  navLocal = localStorage.getItem("navbar-option");

if (navLocal !== null) {
  if ("navbar-option" == "true") {
    document.querySelector(".nav-bar").classList.remove("hidden");
  } else {
    document.querySelector(".nav-bar").classList.add("hidden");
  }
  navBarSett.forEach((ele) => {
    ele.classList.remove("active");
  });
  if (navLocal === "true") {
    document.querySelector(".nav-bar-options .yes").classList.add("active");
  } else {
    document.querySelector(".nav-bar-options .no").classList.add("active");
  }
}

navBarSett.forEach((navbar) => {
  navbar.addEventListener("click", (e) => {
    removeActiveClass(e);
    if (e.target.dataset.nav == "yes") {
      document.querySelector(".nav-bar").classList.remove("hidden");
      localStorage.setItem("navbar-option", true);
    } else {
      document.querySelector(".nav-bar").classList.add("hidden");
      localStorage.setItem("navbar-option", false);
    }
  });
});

// reset all options
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("colors-options");
  localStorage.removeItem("background-option");
  localStorage.removeItem("navbar-option");
  window.location.reload();
};

// scroll to top
let scrollToTop = document.querySelector(".scroll-up");

console.log(window.scrollY);
window.onscroll = function () {
  if (window.scrollY >= 600) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
};

scrollToTop.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
