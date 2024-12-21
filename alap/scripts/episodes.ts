class SeasonEpisode{
    constructor(
        public id : number,
        public title : string,
        public air_date : string,
        public seasonIndex : number,
        public characterList : string[]
    ){}
}

const seasons : number[][] = [[1,11], [12, 22], [22, 32], [32, 42], [42, 52]];
const seasonCharacters: string[][] = []
const episodeListContainer : HTMLDivElement = document.getElementById("episodeContainer") as HTMLDivElement;


// Az adott evad reszeit leszedi
async function getEpisodes(wantedSeason : number){
    episodeListContainer.style.display = ""

    const selectedSeason : number[] = seasons[wantedSeason]
    const seasonEpisodes : SeasonEpisode[] = []

    for(let i : number = selectedSeason[0]; i < selectedSeason[1]; i++){
        let apiCall : Promise<any> = (await fetch(`https://rickandmortyapi.com/api/episode/${i}`)).json()
        let apiData : Promise<any> = await apiCall
        
        seasonEpisodes.push(new SeasonEpisode(apiData["id"], apiData["name"], apiData["air_date"], apiData["episode"][2], apiData["characters"]))
    }

    setDetails(seasonEpisodes, wantedSeason)
}

// Az adott evad reszeit beallitja az oldalon
function setDetails(episodes : SeasonEpisode[], selectedSeason : number){
    (document.getElementById("seasonTitle") as HTMLTitleElement).innerHTML = `${selectedSeason+1}. Season`;
    (document.getElementById("posterImg") as HTMLImageElement).src = `../images/posters/season${selectedSeason+1}.jpg`
}

// Evad kivalasztas
function selectSeason(wantedSeason : number){
    getEpisodes(wantedSeason)
}