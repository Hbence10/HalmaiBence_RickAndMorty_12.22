class Character {
    id;
    name;
    status;
    species;
    type;
    gender;
    origin;
    location;
    imageLink;
    episodeList;
    constructor(id, name, status, species, type, gender, origin, location, imageLink, episodeList) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.species = species;
        this.type = type;
        this.gender = gender;
        this.origin = origin;
        this.location = location;
        this.imageLink = imageLink;
        this.episodeList = episodeList;
    }
}
const characterContainer = document.getElementById("characterContainer");
const searchInput = document.getElementById("searchInput");
const buttonRow = document.getElementById("buttonRow");
const header = document.getElementById("header");
let showInput = false;
// Karakterekhez tartozo script:
async function getCharacters(pageNumber) {
    let apiCall = (await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)).json();
    let apiData = await apiCall;
    const pageList = [];
    apiData["results"].forEach(element => {
        pageList.push(new Character(element.id, element.name, element.status, element.species, element.type, element.gender, element.origin, element.location, element.image, element.episode));
    });
    loadCharacters(pageList);
    return apiCall;
}
function loadCharacters(pageList) {
    while (characterContainer.hasChildNodes()) {
        characterContainer.removeChild(characterContainer.firstChild);
    }
    for (let i = 0; i < pageList.length; i += 3) {
        const row = document.createElement("div");
        row.classList.add("row", "characterRow", "my-3");
        const splittedRow = pageList.slice(i, i + 3);
        for (let j = 0; j < splittedRow.length; j++) {
            const card = document.createElement("div");
            card.classList.add("col-lg-4", "d-flex", "justify-content-center", "align-items-center");
            card.innerHTML = `
                <div class="card testClass">
                    <img src="${splittedRow[j].imageLink}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${splittedRow[j].name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            `;
            card.classList.add("testClass");
            row.appendChild(card);
        }
        characterContainer.appendChild(row);
    }
}
function showSearchInput() {
    showInput = !showInput;
    if (showInput) {
        searchInput.style.display = "";
        header.classList.remove("hideInput");
        header.classList.add("showInput");
    }
    else {
        searchInput.style.display = "none";
        header.classList.remove("showInput");
        header.classList.add("hideInput");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    getCharacters(1);
    for (let i = 1; i <= 12; i++) {
        buttonRow.innerHTML += `<button class='btn btn-outline-dark mx-2' onclick="getCharacters(${i})">${i}</button>`;
    }
    buttonRow.innerHTML += "<button class='btn btn-outline-dark mx-2' onclick='getCharacters(13)'>13</button>";
});
