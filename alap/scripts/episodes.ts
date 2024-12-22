class SeasonEpisode{
    constructor(
        public id : number,
        public title : string,
        public air_date : string,
        public seasonIndex : number,
        public characterList : string[]
    ){}
}

class SeasonCharacter{
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

const seasons : number[][] = [[1,11], [12, 22], [22, 32], [32, 42], [42, 52]];
const seasonCharacters: string[][] = []
const mainContainer : HTMLDivElement = document.getElementById("episodeContainer2") as HTMLDivElement;
const episodeListContainer : HTMLDivElement = document.getElementById("episodeListContainer") as HTMLDivElement;
const episodeContainerSideBar = document.getElementById("episodeContainerSideBar") as HTMLDivElement;

// Az adott evad reszeit leszedi
async function getEpisodes(wantedSeason : number){
    mainContainer.style.display = ""

    const selectedSeason : number[] = seasons[wantedSeason]
    const seasonEpisodes : SeasonEpisode[] = []

    for(let i : number = selectedSeason[0]; i < selectedSeason[1]; i++){
        let apiCall : Promise<any> = (await fetch(`https://rickandmortyapi.com/api/episode/${i}`)).json()
        let apiData : Promise<any> = await apiCall
        
        seasonEpisodes.push(new SeasonEpisode(apiData["id"], apiData["name"], apiData["air_date"], apiData["episode"][2], apiData["characters"]))
        seasonCharacters.push(apiData["characters"])
    }

    setDetails(seasonEpisodes, wantedSeason)
}

// Az adott evad reszeit beallitja az oldalon
function setDetails(episodes : SeasonEpisode[], selectedSeason : number){
    episodeListContainer.innerHTML = "";
    (document.getElementById("seasonTitle") as HTMLTitleElement).innerHTML = `${selectedSeason+1}. Season`;
    (document.getElementById("posterImg") as HTMLImageElement).src = `../images/posters/season${selectedSeason+1}.jpg`;

    for(let i = 0; i < episodes.length; i++){
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
        `
    }
}

let characterList : SeasonCharacter[] = []
async function showCharacters(episodeIndex : number){
    (document.getElementById(`characters${episodeIndex}`) as HTMLDivElement).innerHTML = ""
    const charactersUrl : string[] = seasonCharacters[episodeIndex]
    characterList = []

    for(let i : number = 0; i < charactersUrl.length; i++){
        let apiCall : Promise<any> = (await fetch(charactersUrl[i])).json()
        let apiData : Promise<any> = await apiCall
        
        characterList.push(new SeasonCharacter(apiData["id"], apiData["name"], apiData["status"], apiData["species"], apiData["type"], apiData["gender"], apiData["origin"], apiData["location"], apiData["image"], apiData["episode"]))
    }

    (document.getElementById(`characters${episodeIndex}`) as HTMLDivElement).innerHTML += `
        <div class="row">
            <div class="col-lg-12 d-flex justify-content-end align-items-center">
                <button class="btn btn-outline-dark" onclick="closeDiv('characters${episodeIndex}')">X</button>
            </div>
        </div> 
    `

    for(let i : number = 0; i < characterList.length; i++){
        const rowDiv : HTMLDivElement = document.createElement("div");
        rowDiv.classList.add("row");

        const colDiv : HTMLDivElement = document.createElement("div");
        colDiv.classList.add("col-lg-12");

        const characterTitle : HTMLParagraphElement = document.createElement("p");
        characterTitle.innerHTML = characterList[i].name;
        characterTitle.addEventListener("click", () => {
            selectCharacter(-1, characterList[i])
        });

        colDiv.appendChild(characterTitle);
        rowDiv.appendChild(colDiv);
        (document.getElementById(`characters${episodeIndex}`) as HTMLDivElement).appendChild(rowDiv)
    }
}

function closeDiv(divId : string){
    document.getElementById(divId).innerHTML = ""
}

// Evad kivalasztas
function selectSeason(wantedSeason : number){
    getEpisodes(wantedSeason)
}