"use strict"

interface Data {
    id:number;
    title: string;
    image: string;
    description: string;
    link: string;
}


export default class Project {

    main: HTMLElement|null
    section: HTMLElement
    projectsHeadline: HTMLHeadElement
    template: HTMLTemplateElement
    blogFragment: DocumentFragment
    templateDiv: HTMLDivElement|null
    templateTitle: HTMLHeadingElement|null
    templateImg: HTMLImageElement|null
    templateDesc: HTMLParagraphElement|null
    templateBtn: HTMLButtonElement|null

    constructor(){
        this.main = document.querySelector("main")
        this.section = document.createElement("section")
        this.section.id = "projects"
        this.projectsHeadline = document.createElement("h1")
        this.projectsHeadline.classList.add("projects-headline")
        this.projectsHeadline.textContent = "PROJECTS"
        this.template = document.createElement("template")
        this.template.innerHTML=`
        <div class="projectContainer" id="">
            <h2 class="projectTitle"></h2>
            <div class= "projectImgDiv"><img class="projectImg" src="" alt=""></div>
            <p class="projectDesc"></p>
            <button class="projectBtn">See More</button>
        `
        this.blogFragment = this.template.content
        this.templateDiv = this.blogFragment.querySelector(".projectContainer")
        this.templateTitle = this.blogFragment.querySelector("h2")
        this.templateImg = this.blogFragment.querySelector("img")
        this.templateDesc = this.blogFragment.querySelector("p")
        this.templateBtn = this.blogFragment.querySelector("button")
        this.main?.append(this.section)
        this.section.append(this.projectsHeadline)
        this.section.append(this.template)
    }

    async getProjects(){
        const response: Response = await fetch ("./projects.json")
        if(response.ok){
            const projectsData: Data[] = await response.json()
            projectsData.forEach((projectData) => {
                // console.log(projectData);
                this.templateDiv!.id = `projectContainer ${(projectData.id).toString()}`
                this.templateTitle!.textContent = projectData.title
                this.templateImg!.src = projectData.image
                this.templateDesc!.textContent = projectData.description
                // console.log(projectData.link);
                const clone = this.blogFragment.cloneNode(true) as DocumentFragment;
                const clonedButton = clone.querySelector(".projectBtn") as HTMLButtonElement;
                clonedButton.onclick = () => window.open(projectData.link, "_blank");
                this.section?.append(clone);
            })
        }
    }
    
}

