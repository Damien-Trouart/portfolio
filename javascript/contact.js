"use strict";
// export FormRegex{
//     main:HTMLElement|null
//     section:HTMLElement|null
//     form:HTMLFormElement|null
//     firstName : HTMLInputElement|null
//     // lastName: HTMLElement|null
//     mail: HTMLInputElement|null
//     comment: HTMLInputElement|null
//     constructor(){
//         //TODO Création du formulaire
//         this.section = document.querySelector("#contact")
//         this.form = document.createElement("form")
//         this.form.method = ("")
//         this.form.action = ("")
//         this.form.innerHTML= `
//             <label class="nameLabel" for="firstName">Name:</label>
//             <input class="nameInput" type="text" id="firstName" placeholder="Your name" required>
//             <!-- <label for="lastName">Prénom</label>
//             <input type="text" id="lastName" placeholder="Marcel" required> -->
//             <label class="mailLabel" for="mail">Email:</label>
//             <input class="mailInput" type="email" id="mail" placeholder="Your email adress" required>
//             <label class="msgLabel" for="comment">Message:</label> 
//             <textarea class="msgInput" name="commentaire" id="comment" rows="5" cols="20" placeholder="Hello..."></textarea>
//             <input class="btn eraseBtn" type="reset" value="Effacer">
//             <input class="btn sendBtn" type="submit" value="Envoyer">
//         `
//         this.main = document.querySelector("main")
//         this.section.id = "contact"
//TODO Attribution des variables
const firstName = document.querySelector("#firstName");
// const lastName: HTMLElement|null = document.getElementById("lastName")
const mail = document.querySelector(".mailInput");
const comment = document.querySelector(".msgInput");
//TODO fonction "squelette" pour comparer l'input des utilisateurs et la regex, et associer un code couleur en cas d'erreur
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
//TODO fonction qui à la detection de l'input de l'utilisateur, utilise la fonction "squelette" précédante pour comparer avec des regex spécifiques pour chaque entrée du formulaire
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
