class SeasonEpisode {
    id;
    title;
    air_date;
    seasonIndex;
    characterList;
    constructor(id, title, air_date, seasonIndex, characterList) {
        this.id = id;
        this.title = title;
        this.air_date = air_date;
        this.seasonIndex = seasonIndex;
        this.characterList = characterList;
    }
}
class SeasonCharacter {
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
const seasons = [[1, 11], [12, 22], [22, 32], [32, 42], [42, 52]];
const seasonCharacters = [];
const mainContainer = document.getElementById("episodeContainer2");
const episodeListContainer = document.getElementById("episodeListContainer");
const episodeContainerSideBar = document.getElementById("episodeContainerSideBar");
// Az adott evad reszeit leszedi
async function getEpisodes(wantedSeason) {
    mainContainer.style.display = "";
    const selectedSeason = seasons[wantedSeason];
    const seasonEpisodes = [];
    for (let i = selectedSeason[0]; i < selectedSeason[1]; i++) {
        let apiCall = (await fetch(`https://rickandmortyapi.com/api/episode/${i}`)).json();
        let apiData = await apiCall;
        seasonEpisodes.push(new SeasonEpisode(apiData["id"], apiData["name"], apiData["air_date"], apiData["episode"][2], apiData["characters"]));
        seasonCharacters.push(apiData["characters"]);
    }
    setDetails(seasonEpisodes, wantedSeason);
}
// Az adott evad reszeit beallitja az oldalon
function setDetails(episodes, selectedSeason) {
    episodeListContainer.innerHTML = "";
    document.getElementById("seasonTitle").innerHTML = `${selectedSeason + 1}. Season`;
    document.getElementById("posterImg").src = `../images/posters/season${selectedSeason + 1}.jpg`;
    for (let i = 0; i < episodes.length; i++) {
        episodeListContainer.innerHTML += `
            <div class="row">
                <div class="col-lg-12">
                    <div class="container-fluid">
                        
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="d-flex flex-row justify-content-between">
                                    <h4>${episodes[i].title}</h4>
                                    <button onclick="showCharacters(${i})" class="btn btn-outline-dark">Characters</button>
                                </div>
                                <p><span class="fw-bold">Aired:</span> ${episodes[i].air_date}</p>
                            </div>
                        </div>

                        <hr>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="container-fluid" id="characters${i}">
                                
                                </div>
                            </div>
                        </div>                        

                    </div>
                </div>
            </div>
        `;
    }
}
let characterList = [];
async function showCharacters(episodeIndex) {
    document.getElementById(`characters${episodeIndex}`).innerHTML = "";
    const charactersUrl = seasonCharacters[episodeIndex];
    characterList = [];
    for (let i = 0; i < charactersUrl.length; i++) {
        let apiCall = (await fetch(charactersUrl[i])).json();
        let apiData = await apiCall;
        characterList.push(new SeasonCharacter(apiData["id"], apiData["name"], apiData["status"], apiData["species"], apiData["type"], apiData["gender"], apiData["origin"], apiData["location"], apiData["image"], apiData["episode"]));
    }
    document.getElementById(`characters${episodeIndex}`).innerHTML += `
        <div class="row">
            <div class="col-lg-12 d-flex justify-content-end align-items-center">
                <button class="btn btn-outline-dark" onclick="closeDiv('characters${episodeIndex}')">X</button>
            </div>
        </div> 
    `;
    for (let i = 0; i < characterList.length; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-lg-12");
        const characterTitle = document.createElement("p");
        characterTitle.innerHTML = characterList[i].name;
        characterTitle.addEventListener("click", () => {
            selectCharacter(-1, characterList[i]);
        });
        colDiv.appendChild(characterTitle);
        rowDiv.appendChild(colDiv);
        document.getElementById(`characters${episodeIndex}`).appendChild(rowDiv);
    }
}
function closeDiv(divId) {
    document.getElementById(divId).innerHTML = "";
}
// Evad kivalasztas
function selectSeason(wantedSeason) {
    getEpisodes(wantedSeason);
}
