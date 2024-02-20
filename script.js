document.addEventListener("DOMContentLoaded", function () {
    var currentPage = window.location.pathname.split('/').pop();
    console.log(currentPage);
 
    if (localStorage.getItem(currentPage) === null) {
        localStorage.setItem(currentPage, 1);
    } else {
        let pageCounter = parseInt(localStorage.getItem(currentPage), 10);
        localStorage.setItem(currentPage, pageCounter + 1);
    }

    updatePopularLinks();
});

function updatePopularLinks() {
    let pageTitles = {
        "index.html": "Početna stranica",
        "destinacije.html": "Destinacije",
        "galerija.html": "Galerija",
        "fest.html": "SoFest",
        "kontakt.html": "Kontakt"
    };

    let allPages = Object.keys(localStorage);
    allPages.sort(function (a, b) {
        return localStorage[b] - localStorage[a];
    });

    let popularLinksList = document.getElementById("popularLinksList");
    for (let i = 0; i < Math.min(3, allPages.length); i++) {
        let page = allPages[i];
        let pageCounter = localStorage.getItem(page);

        // Prikazivanje naslova stranice umesto putanje
        let pageTitle = pageTitles[page] || "Nepoznato";

        let listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${page}">${pageTitle}</a> (${pageCounter} poseta)`;
        popularLinksList.appendChild(listItem);
    }

}

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.style.display = (mobileMenu.style.display === 'block') ? 'none' : 'block';
    
}

function validacijaForme() {
    var forma = document.getElementById("forma-kontakt");
    var email = forma.email.value;
    var lozinka = forma.lozinka.value;
    var potvrdaLozinke = forma.potvrdaLozinke.value;

    
    var emailValidacija = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailValidacija)) {
        prikaziGresku("E-mail adresa nije ispravna!");
        return false;
    }

    var lozinkaValidacija = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (lozinka.length < 6 || !lozinka.match(lozinkaValidacija) || lozinka !== potvrdaLozinke) {
        prikaziGresku("Lozinka nije ispravno uneta!");
        return false;
    }

    return true;
}

function prikaziGresku(poruka) {
    var greskaPoruka = document.getElementById("greskaPoruka");
    greskaPoruka.innerHTML = poruka;
}
var slideIndex = 1;
showSlides(slideIndex);

function pomeri(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slider");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}