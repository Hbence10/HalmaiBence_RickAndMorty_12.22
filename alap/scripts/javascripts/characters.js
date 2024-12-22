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
class Episode {
    id;
    title;
    air_date;
    seasonIndex;
    constructor(id, title, air_date, seasonIndex) {
        this.id = id;
        this.title = title;
        this.air_date = air_date;
        this.seasonIndex = seasonIndex;
    }
}
const episodeListShowButton = document.getElementById("episodeListShowButton");
const characterContainer = document.getElementById("characterContainer");
const episodeContainer = document.getElementById("episodeContainer");
const statusSelect = document.getElementById("statusSelect");
const genderSelect = document.getElementById("genderSelect");
const searchInput = document.getElementById("searchInput");
const buttonRow = document.getElementById("buttonRow");
const filterDiv = document.getElementById("filterDiv");
const filterRow = document.getElementById("filterRow");
const sideBar = document.getElementById("sideBar");
const header = document.getElementById("header");
let showEpisodes = false;
let showFilter = false;
let showInput = false;
let buttonNumbers = [];
let pageList = [];
let actualPage = 1;
// Karakterekhez tartozo script:
async function getCharacters(newPage) {
    try {
        let apiCall = (await fetch(`https://rickandmortyapi.com/api/character/?page=${newPage}&name=${searchInput.value}&status=${statusSelect.value}&gender=${genderSelect.value}`)).json();
        let apiData = await apiCall;
        pageList = [];
        apiData["results"].forEach(element => {
            pageList.push(new Character(element.id, element.name, element.status, element.species, element.type, element.gender, element.origin, element.location, element.image, element.episode));
        });
        console.log(apiData);
        loadCharacters(pageList, apiData["info"].pages, newPage);
        return apiCall;
    }
    catch (error) {
    }
}
function loadCharacters(pageList, pageCount, newPage) {
    characterContainer.innerHTML = "";
    for (let i = 0; i < pageList.length; i += 3) {
        const row = document.createElement("div");
        row.classList.add("row", "characterRow", "my-lg-5");
        const splittedRow = pageList.slice(i, i + 3);
        for (let j = 0; j < splittedRow.length; j++) {
            const card = document.createElement("div");
            card.classList.add("col-lg-4", "d-flex", "justify-content-center", "align-items-center");
            card.innerHTML = `
                <div class="card my-md-4 my-sm-4 my-4">
                    <img src="${splittedRow[j].imageLink}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h4 class="card-title characterName">${splittedRow[j].name}</h4>
                        <ul>
                            <li><span class="spanText fw-bold">Status: </span> ${splittedRow[j].status}</li>
                            <li><span class="spanText fw-bold">Gender: </span> ${splittedRow[j].gender}</li>
                        </ul>
                        <button class="btn btn-outline-dark" onclick="selectCharacter(${i + j})">Check Details</button>
                    </div>
                </div>
            `;
            row.appendChild(card);
        }
        characterContainer.appendChild(row);
    }
    setButtons(pageCount, newPage);
}
function selectCharacter(index, episodeCharacter) {
    let wantedCharacter;
    if (index != -1) {
        wantedCharacter = pageList[index];
    }
    else {
        wantedCharacter = episodeCharacter;
    }
    loadEpisodeList(wantedCharacter.episodeList);
    sideBar.style.display = "";
    sideBar.classList.add("showSideBar");
    sideBar.classList.remove("hideSideBar");
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
    const selectedSeasons = [];
    const seasonDivs = [];
    const episodes = [];
    let seasonIndex = -1;
    for (let i = 0; i < episodeList.length; i++) {
        let apiCall = (await fetch(episodeList[i])).json();
        let apiData = await apiCall;
        if (!selectedSeasons.includes(apiData["episode"][2])) {
            selectedSeasons.push(apiData["episode"][2]);
            seasonDivs.push(document.createElement("div"));
            seasonIndex += 1;
        }
        episodes.push(new Episode(apiData["id"], apiData["name"], apiData["air_date"], apiData["episode"][2]));
    }
    for (let i = 0; i < selectedSeasons.length; i++) {
        episodeContainer.innerHTML += `
            <div class="container-fluid my-2">
                <div class="row seasonContainer">
                    <div class="col-lg-12 d-flex justify-content-between align-items-center">
                        <h5>Season ${selectedSeasons[i]}</h5>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-12 d-flex flex-column justify-content-center align-items-center">
                        <div class="container-fluid my-2" id="${selectedSeasons[i]}season">

                        </div>        
                    </div>
                </div>
            </div>
        `;
    }
    for (let i = 0; i < episodes.length; i++) {
        console.log(`${episodes[i].seasonIndex}season`);
        document.getElementById(`${episodes[i].seasonIndex}season`).innerHTML += `
            <div class="row">
                <div class="col-lg-12 ">
                    <h6>${episodes[i].title}</h6>
                    <p><span class="fw-bold">Aired:</span> ${episodes[i].air_date}</p>
                    <hr>
                </div>
            </div>
        `;
    }
}
// Egyeb dolgok:
function showSearchInput() {
    showInput = !showInput;
    if (showInput) {
        filterDiv.style.display = "";
        header.classList.remove("hideInput");
        header.classList.add("showInput");
    }
    else {
        filterDiv.style.display = "none";
        header.classList.remove("showInput");
        header.classList.add("hideInput");
        filterRow.style.display = "none";
        showFilter = false;
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
        episodeListShowButton.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
    }
    else {
        episodeContainer.style.display = "none";
        episodeListShowButton.innerHTML = `<i class="fa-solid fa-arrow-down-long"></i>`;
    }
}
function showFilterRow() {
    showFilter = !showFilter;
    if (showFilter) {
        filterRow.style.display = "";
    }
    else {
        filterRow.style.display = "none";
    }
}
function pageSwitch(newPage) {
    getCharacters(newPage);
}
function setButtons(pageCount, newPage) {
    console.log(`pageCount: ${pageCount}, newPage: ${newPage}, actualPage: ${actualPage}`);
    buttonNumbers = [];
    buttonRow.innerHTML = "";
    if (newPage == 1) { //Ha az elso oldalra megyunk)
        for (let i = 1; i < pageCount; i++) {
            if (buttonNumbers.length == 12) {
                break;
            }
            else {
                buttonNumbers.push(i);
            }
        }
    }
    else if (newPage == pageCount) { //Ha az utolso oldalra megyunk
        const numbers = [];
        for (let i = pageCount + 1; i >= 0; i--) {
            if (numbers.length == 12) {
                break;
            }
            else {
                numbers.push(i);
            }
        }
        numbers.reverse().forEach(element => { buttonNumbers.push(element); });
    }
    else if (newPage > actualPage && pageCount >= 12) { //Ha elore megyunk a listaban
        let startNumber = newPage;
        if (newPage + 12 >= pageCount && newPage >= 2) {
            startNumber = pageCount - 10;
        }
        for (let i = startNumber - 1; i <= pageCount; i++) {
            if (buttonNumbers.length == 12) {
                break;
            }
            else {
                buttonNumbers.push(i);
            }
        }
    }
    else if (newPage < actualPage && pageCount >= 12) { //Ha a listaban hatra megyunk
        if (newPage <= 12) {
            for (let i = 1; i < 13; i++) {
                buttonNumbers.push(i);
            }
        }
        else {
            if (newPage < pageCount) {
                for (let i = newPage + 1; i > 0; i--) {
                    if (buttonNumbers.length == 12) {
                        break;
                    }
                    else {
                        if (i != pageCount) {
                            buttonNumbers.push(i);
                        }
                    }
                }
                buttonNumbers = buttonNumbers.reverse();
            }
        }
    }
    else if (pageCount <= 12) {
        for (let i = 1; i <= pageCount - 1; i++) {
            buttonNumbers.push(i);
        }
    }
    for (let i = 0; i < buttonNumbers.length; i++) {
        buttonRow.innerHTML += `<button class="btn btn-outline-dark mx-1 my-2" onclick="pageSwitch(${buttonNumbers[i]})">${buttonNumbers[i]}</button>`;
    }
    if (newPage == 1) {
        actualPage = 1;
    }
    actualPage = newPage;
    buttonRow.children[buttonNumbers.indexOf(actualPage)].classList.add("selectedPage");
}
document.addEventListener("DOMContentLoaded", () => {
    try {
        getCharacters(actualPage);
    }
    catch (error) {
    }
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeSideBar();
    }
});
