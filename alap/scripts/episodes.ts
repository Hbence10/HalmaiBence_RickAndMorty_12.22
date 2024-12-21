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
const episodeListContainer : HTMLDivElement = document.getElementById("episodeContainer") as HTMLDivElement;


// Az adott evad reszeit leszedi
async function getEpisodes(wantedSeason : number){
    console.log("-")

    const selectedSeason : number[] = seasons[wantedSeason]
    const seasonEpisodes : SeasonEpisode[] = []

    for(let i : number = selectedSeason[0]; i < selectedSeason[1]; i++){
        let apiCall : Promise<any> = (await fetch(`https://rickandmortyapi.com/api/episode/${i}`)).json()
        let apiData : Promise<any> = await apiCall
        
        // seasonEpisodes.push()
        console.log(apiData)
    }

    setDetails(seasonEpisodes)
}

// Az adott evad reszeit beallitja az oldalon
function setDetails(episodes : SeasonEpisode[]){

}

// Evad kivalasztas
function selectSeason(wantedSeason : number){
    getEpisodes(wantedSeason)
}