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

const characterContainer : HTMLDivElement = document.getElementById("characterContainer") as HTMLDivElement;
const episodeContainer : HTMLDivElement = document.getElementById("episodeContainer") as HTMLDivElement;
const searchInput : HTMLInputElement = document.getElementById("searchInput") as HTMLInputElement;
const buttonRow : HTMLDivElement = document.getElementById("buttonRow") as HTMLDivElement;
const filterDiv : HTMLDivElement = document.getElementById("filterDiv") as HTMLDivElement;
const sideBar : HTMLDivElement = document.getElementById("sideBar") as HTMLDivElement;
const header : HTMLDivElement = document.getElementById("header") as HTMLDivElement;
interface origin {name : string, url : string}
interface location {name : string, url : string}
let showEpisodes : boolean = false
let showInput : boolean = false
let pageList : Character[] = []

// Karakterekhez tartozo script:
async function getCharacters(pageNumber : number) : Promise<any>{
    let apiCall : Promise<any> = (await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)).json()
    let apiData : Promise<any> = await apiCall
    pageList = []

    apiData["results"].forEach(element => {
        pageList.push(new Character(element.id, element.name, element.status, element.species, element.type, element.gender, element.origin, element.location, element.image, element.episode))
    });
    
    loadCharacters(pageList)

    return apiCall
}

function loadCharacters(pageList : Character[]){
    characterContainer.innerHTML = ""

    for(let i : number = 0; i < pageList.length; i+=3){
        const row : HTMLDivElement = document.createElement("div")
        row.classList.add("row", "characterRow", "my-lg-5")
        const splittedRow : Character[] = pageList.slice(i, i+3)
        
        for (let j : number = 0; j < splittedRow.length; j++){
            const card : HTMLDivElement = document.createElement("div")
            card.classList.add("col-lg-4", "d-flex", "justify-content-center", "align-items-center")
            card.innerHTML = `
                <div class="card testClass">
                    <img src="${splittedRow[j].imageLink}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${splittedRow[j].name}</h5>
                        <ul>
                            <li><span class="fw-bold">Status: </span> ${splittedRow[j].status}</li>
                            <li><span class="fw-bold">Gender: </span> ${splittedRow[j].gender}</li>
                        </ul>
                        <button class="btn btn-outline-dark" onclick="selectCharacter(${i+j})">Go somewhere</button>
                    </div>
                </div>
            `
            card.classList.add("testClass")
            row.appendChild(card)
        }

        characterContainer.appendChild(row)
    }
}

function selectCharacter(index : number){
    const wantedCharacter : Character = pageList[index]
    loadEpisodeList(wantedCharacter.episodeList);
    sideBar.style.display = ""
    sideBar.classList.add("showSideBar")
    sideBar.classList.remove("hideSideBar")

    console.log(wantedCharacter);

    (document.getElementById("selectedImg") as HTMLImageElement).src = wantedCharacter.imageLink;
    (document.getElementById("selectedName") as HTMLTitleElement).innerHTML = wantedCharacter.name;
    
    (document.getElementById("status") as HTMLSpanElement).innerHTML = wantedCharacter.status;
    (document.getElementById("species") as HTMLSpanElement).innerHTML = wantedCharacter.species;
    (document.getElementById("gender") as HTMLSpanElement).innerHTML = wantedCharacter.gender;
    (document.getElementById("type") as HTMLSpanElement).innerHTML = wantedCharacter.type == "" ? "-" : wantedCharacter.type;

    (document.getElementById("origin") as HTMLLinkElement).innerHTML = wantedCharacter.origin.name;
    (document.getElementById("origin") as HTMLLinkElement).href = wantedCharacter.origin.url;

    (document.getElementById("location") as HTMLLinkElement).innerHTML = wantedCharacter.location.name;
    (document.getElementById("location") as HTMLLinkElement).href = wantedCharacter.location.url;
}

async function loadEpisodeList(episodeList : string[]){
    episodeContainer.innerHTML = ""

    for (let i : number = 0; i < episodeList.length; i++){
        let apiCall : Promise<any> = (await fetch(episodeList[i])).json()
        let apiData : Promise<any> = await apiCall

        episodeContainer.innerHTML += `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h5>${apiData["name"]}</h5>
                    </div>
                </div>
            </div>
        `        
    }
}

// Egyeb dolgok:
function showSearchInput() {
    showInput = !showInput
    if (showInput) {
        filterDiv.style.display = ""
        header.classList.remove("hideInput")
        header.classList.add("showInput")
    } else {
        filterDiv.style.display = "none"
        header.classList.remove("showInput")
        header.classList.add("hideInput")
    }
}

function closeSideBar(){
    sideBar.classList.remove("showSideBar")
    sideBar.classList.add("hideSideBar")
}

function showEpisodeList(){
    showEpisodes = !showEpisodes
    if (showEpisodes){
        episodeContainer.style.display = ""
    } else{
        episodeContainer.style.display = "none"
    }
}

function pageSwitch(newPage : number){
    
    getCharacters(newPage);
}


document.addEventListener("DOMContentLoaded", () =>{
    getCharacters(1)

    for(let i : number = 1; i <= 12; i++){
        buttonRow.innerHTML += `<button class='btn btn-outline-dark mx-2' onclick="pageSwitch(${i})">${i}</button>`
    }

    buttonRow.innerHTML += "<button class='btn btn-outline-dark mx-2' onclick='pageSwitch(13)'>42</button>"
})

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape"){
        closeSideBar()   
    }
})