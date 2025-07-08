"use strict";
import Burger from "./burger.js";
import Project from "./project.js";
import { submitContactForm } from "./contact.js";
submitContactForm();
//? Création Home Page
const main = document.querySelector('main');
main.innerHTML += `
        <section class="home" id="home">
            <div class="home_txt">
                <h2 class="helloThere">Hello There!</h2>
                <p>I'm <span class="name">Damien Trouart</span></p>
                <p>At 32, I swapped pipettes for code. My path through science and varied industries led me to web development — where I now grow as a <span>junior fullstack</span> web developer.</p>
            </div>
            <div class="home_img">
                <img src="./image/pp.jpg" alt="profile picture">
            </div>
        </section>
    `;
const pp = document.querySelector(".home_img");
// appear(pp!)
//? BOUTONS LIENS HOME VERSION DESKTOP
const homeTxt = document.querySelector('.home_txt');
if (window.matchMedia('screen and (min-width:360px)').matches) {
    homeTxt.innerHTML +=
        `<div class="home-btns">
            <div class="btn btn-github"><a href="https://github.com/Damien-Trouart" target="_blank">
                <div class="btn-img"><img src="./logo/github.png" alt="Github logo"></div>
                Github
            </a></div>
            <div class="btn btn-linkedin"><a href="https://linkedin.com/Damien-Trouart" target="_blank">
                <div class="btn-img"><img src="./logo/linkedin-logo.png" alt="LinkedIn logo"></div>
                Linkedin
            </a></div>
            <div class="btn btn-mail"><a href="mailto:damien.trouart@gmail.com" target="_blank">
                <div class="btn-img"><img src="./logo/email.png" alt="Email logo"></div>
                Email
            </a></div>
        </div>
        `;
}
//? import de la section projets et les projets associés
const P = new Project();
P.getProjects().then(() => {
    const projectSection = document.querySelector("#projects");
    const projects = Array.from(document.querySelectorAll(".projectContainer"));
    // console.log(projects);
    const observer = new IntersectionObserver(setIndicator, { threshold: 0.05 });
    observer.observe(projectSection);
    let lastScrollY = window.scrollY;
    function setIndicator(entries) {
        const scrollingDown = window.scrollY > lastScrollY;
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                projects?.forEach((project) => {
                    appear(project, scrollingDown);
                });
                // console.log(entry);
            }
        });
        lastScrollY = window.scrollY;
    }
});
// const projects: HTMLElement[]|null = Array.from(P.blogFragment.querySelectorAll("projectContainer"))
// console.log(projects);
//? Création des regex incluses au formulaire de contact
//* Attribution des variables
const firstName = document.querySelector("#firstName");
// const lastName: HTMLElement|null = document.getElementById("lastName")
const mail = document.querySelector(".mailInput");
const comment = document.querySelector(".msgInput");
//* fonction "squelette" pour comparer l'input des utilisateurs et la regex, et associer un code couleur en cas d'erreur
function compareInputToRegex(inputHTLM, inputRegex) {
    if (inputRegex.test(inputHTLM.value) || inputHTLM.value === "") {
        inputHTLM.style.backgroundColor = "";
        inputHTLM.style.borderColor = "";
    }
    else {
        inputHTLM.style.backgroundColor = "rgba(255,0,0,0.5)";
        inputHTLM.style.borderColor = "red";
    }
}
//* fonction qui à la detection de l'input de l'utilisateur, utilise la fonction "squelette" précédante pour comparer avec des regex spécifiques pour chaque entrée du formulaire
function RegexOnFillIn() {
    const fields = [
        { input: firstName, regex: /^[a-zA-Zéèëêùöñç\- ']+$/ },
        // {inputHTML: this.lastName, inputRegex: /^[a-zA-Zéèëêùöñç\- ']+$/},
        { input: mail, regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}/ },
        { input: comment, regex: /^.+$/ }
    ];
    fields.forEach((field) => {
        if (field.input) {
            field.input.addEventListener("input", () => {
                compareInputToRegex(field.input, field.regex);
            });
        }
    });
}
RegexOnFillIn();
//? ANIMATIONS 
//* Hellothere
const title = document.querySelector('.helloThere');
const homeBtns = Array.from(document.querySelectorAll('.btn'));
function helloThere() {
    const keyframes = {
        transform: ["scale(1) translateY(0)", "scale(1, 0.5) translateY(100%)", "scale(1, 0.33) translateY(150%)", "scale(1, 0.65) translateY(50%)", "scale(1, 0.9) translateY(0)", "scale(1) translateY(0)"],
    };
    const options = {
        duration: 250,
        timing: "ease-in",
    };
    title?.animate(keyframes, options);
}
helloThere();
//* appear
function appear(e, scrollingDown = true) {
    let keyframes;
    if (scrollingDown) {
        keyframes = {
            opacity: ["0", "0.5", "1"],
            transform: ["translateY(100%)", "translateY(50%)", "translateY(0)"]
        };
    }
    else {
        keyframes = {
            opacity: ["0", "0.5", "1"],
            transform: ["translateY(-100%)", "translateY(-50%)", "translateY(0)"]
        };
    }
    const options = {
        duration: 250,
    };
    e.animate(keyframes, options);
}
homeBtns.forEach((btn) => {
    appear(btn);
});
//? Ajout le burger menu en dimension phone/tablette
if (window.matchMedia('screen and (max-width: #{breakpoint-desktop})').matches) {
    const burger = new Burger();
    burger.toggle(burger.nav);
    burger.logoClick();
}
