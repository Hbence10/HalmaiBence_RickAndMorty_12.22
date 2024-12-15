class Character{
    constructor(
        public id : number,
        public name : string,
        public status : string,
        public species : string,
        public type: string,
        public gender : string,
        public origin : origin,
        public location : location,
        public imageLink : string,
        public episodeList : string[]
    ){}
}

const characterContainer : HTMLDivElement = document.getElementById("characterContainer") as HTMLDivElement
const searchInput : HTMLInputElement = document.getElementById("searchInput") as HTMLInputElement
const buttonRow : HTMLDivElement = document.getElementById("buttonRow") as HTMLDivElement
const header : HTMLDivElement = document.getElementById("header") as HTMLDivElement
interface origin {name : string, url : string}
interface location {name : string, url : string}
let showInput : boolean = false

// Karakterekhez tartozo script:
async function getCharacters(pageNumber : number) : Promise<any>{
    let apiCall : Promise<any> = (await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)).json()
    let apiData : Promise<any> = await apiCall
    const pageList : Character[] = []

    apiData["results"].forEach(element => {
        pageList.push(new Character(element.id, element.name, element.status, element.species, element.type, element.gender, element.origin, element.location, element.image, element.episode))
    });
    
    loadCharacters(pageList)

    return apiCall
}

function loadCharacters(pageList : Character[]){
    while (characterContainer.hasChildNodes()){
        characterContainer.removeChild(characterContainer.firstChild)
    }

    for(let i : number = 0; i < pageList.length; i+=3){
        const row : HTMLDivElement = document.createElement("div")
        row.classList.add("row", "characterRow", "my-3")
        const splittedRow : Character[] = pageList.slice(i, i+3)

        for (let j : number = 0; j < splittedRow.length; j++){
            const card : HTMLDivElement = document.createElement("div")
            card.classList.add("col-lg-4", "d-flex", "justify-content-center", "align-items-center")
            card.innerHTML = `
                <div class="card testClass">
                    <img src="${splittedRow[j].imageLink}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${splittedRow[j].name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            `
            card.classList.add("testClass")
            row.appendChild(card)
        }

        characterContainer.appendChild(row)
    }
}

function showSearchInput(){
    showInput = !showInput
    if (showInput){
        searchInput.style.display = ""
        header.classList.remove("hideInput")
        header.classList.add("showInput")
    } else{
        searchInput.style.display = "none"
        header.classList.remove("showInput")
        header.classList.add("hideInput")
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    getCharacters(1)

    for(let i : number = 1; i <= 12; i++){
        buttonRow.innerHTML += `<button class='btn btn-outline-dark mx-2' onclick="getCharacters(${i})">${i}</button>`
    }

    buttonRow.innerHTML += "<button class='btn btn-outline-dark mx-2' onclick='getCharacters(13)'>13</button>"
})