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
const episodeContainer = document.getElementById("episodeContainer");
const searchInput = document.getElementById("searchInput");
const buttonRow = document.getElementById("buttonRow");
const sideBar = document.getElementById("sideBar");
const header = document.getElementById("header");
let showEpisodes = false;
let showInput = false;
let pageList = [];
// Karakterekhez tartozo script:
async function getCharacters(pageNumber) {
    let apiCall = (await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)).json();
    let apiData = await apiCall;
    pageList = [];
    apiData["results"].forEach(element => {
        pageList.push(new Character(element.id, element.name, element.status, element.species, element.type, element.gender, element.origin, element.location, element.image, element.episode));
    });
    loadCharacters(pageList);
    return apiCall;
}
function loadCharacters(pageList) {
    characterContainer.innerHTML = "";
    for (let i = 0; i < pageList.length; i += 3) {
        const row = document.createElement("div");
        row.classList.add("row", "characterRow", "my-lg-5");
        const splittedRow = pageList.slice(i, i + 3);
        for (let j = 0; j < splittedRow.length; j++) {
            const card = document.createElement("div");
            card.classList.add("col-lg-4", "d-flex", "justify-content-center", "align-items-center");
            card.innerHTML = `
                <div class="card testClass">
                    <img src="${splittedRow[j].imageLink}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${splittedRow[j].name}</h5>
                        <ul>
                            <li><span class="fw-bold">Status: </span> ${splittedRow[j].status}</li>
                            <li><span class="fw-bold">Gender: </span> ${splittedRow[j].gender}</li>
                        </ul>
                        <button class="btn btn-outline-dark" onclick="selectCharacter(${i + j})">Go somewhere</button>
                    </div>
                </div>
            `;
            card.classList.add("testClass");
            row.appendChild(card);
        }
        characterContainer.appendChild(row);
    }
}
function selectCharacter(index) {
    const wantedCharacter = pageList[index];
    loadEpisodeList(wantedCharacter.episodeList);
    sideBar.style.display = "";
    sideBar.classList.add("showSideBar");
    sideBar.classList.remove("hideSideBar");
    console.log(wantedCharacter);
    document.getElementById("selectedImg").src = wantedCharacter.imageLink;
    document.getElementById("selectedName").innerHTML = wantedCharacter.name;
    document.getElementById("status").innerHTML = wantedCharacter.status;
    document.getElementById("species").innerHTML = wantedCharacter.species;
    document.getElementById("gender").innerHTML = wantedCharacter.gender;
    document.getElementById("type").innerHTML = wantedCharacter.type == "" ? "-" : wantedCharacter.type;
    document.getElementById("origin").innerHTML = wantedCharacter.origin.name;
    document.getElementById("origin").href = wantedCharacter.origin.url;
    document.getElementById("location").innerHTML = wantedCharacter.location.name;
    document.getElementById("location").href = wantedCharacter.location.url;
}
async function loadEpisodeList(episodeList) {
    episodeContainer.innerHTML = "";
    for (let i = 0; i < episodeList.length; i++) {
        let apiCall = (await fetch(episodeList[i])).json();
        let apiData = await apiCall;
        episodeContainer.innerHTML += `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h5>${apiData["name"]}</h5>
                    </div>
                </div>
            </div>
        `;
    }
}
// Egyeb dolgok:
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
function closeSideBar() {
    sideBar.classList.remove("showSideBar");
    sideBar.classList.add("hideSideBar");
}
function showEpisodeList() {
    showEpisodes = !showEpisodes;
    if (showEpisodes) {
        episodeContainer.style.display = "";
    }
    else {
        episodeContainer.style.display = "none";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    getCharacters(1);
    for (let i = 1; i <= 12; i++) {
        buttonRow.innerHTML += `<button class='btn btn-outline-dark mx-2' onclick="getCharacters(${i})">${i}</button>`;
    }
    buttonRow.innerHTML += "<button class='btn btn-outline-dark mx-2' onclick='getCharacters(13)'>42</button>";
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeSideBar();
    }
});