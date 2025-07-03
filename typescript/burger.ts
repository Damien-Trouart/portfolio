"use strict"

export default class Burger{
    //? déclaration des propriétés de Burger
        private header:HTMLElement|null
        public nav:HTMLElement
        private container:HTMLDivElement
        // label:HTMLLabelElement
        private toggler:HTMLInputElement
        private logoBurger:HTMLImageElement
        private logoBackArrow:HTMLImageElement

    constructor(){
        //TODO création des éléments
            this.header = document.querySelector("header")
            this.container = document.createElement("div")
            // this.label = document.createElement("label")
            this.toggler = document.createElement("input")
            this.logoBurger = document.createElement("img")
            this.logoBackArrow = document.createElement("img")
            this.nav = document.createElement("nav")
            this.nav.innerHTML=`
            <ul>
                <li class="navHome"><a href="#">Home</a></li>
                <li class="navCreation"><a href="#projects">Creations</a></li>
                <li class="navContact"><a href="#contact">Contact</a></li>
            </ul>`

            
        //TODO création des attributs (alt, chemin sources...)
            this.toggler.type = "checkbox"
            this.logoBurger.src = "./../2.0/logo/burger-logo.svg"
            this.logoBurger.alt = "logo Burger Menu"
            this.logoBackArrow.src = "./../2.0/logo/back-arrow.svg"
            this.logoBackArrow.alt = "logo back arrow"
        
        //TODO création des classes
            // this.label.classList.add("label")
            this.container.classList.add("container")
            this.toggler.classList.add("toggle")
            this.toggler.classList.add("hide")
            this.logoBurger.classList.add("logoBurger")
            this.logoBackArrow.classList.add("logoBackArrow")
        
        //TODO imbrication des éléments
            this.header?.append(this.nav)
            this.header?.append(this.container)
            this.container.append(this.toggler)
            this.container.append(this.logoBurger)
            this.container.append(this.logoBackArrow)
    }

    //? fonction ajoutant/enlevant la classe "hide"
        toggle(e:HTMLElement):void{
            if(this.toggler.checked){
                e.classList.remove("hide")
                this.logoBackArrow.classList.remove("hide")
                this.logoBurger.classList.add("hide")
            }
            else{
                e.classList.add("hide")
                this.logoBackArrow.classList.add("hide")
                this.logoBurger.classList.remove("hide")
            }
        }

    //? Associer toggle au clic
        logoClick():void{
            this.logoBurger.addEventListener("click",()=>{
                this.toggler.checked=!this.toggler.checked
                this.toggle(this.nav)
            })
            this.logoBackArrow.addEventListener("click",()=>{
                this.toggler.checked=!this.toggler.checked
                this.toggle(this.nav)
            })
        }
}