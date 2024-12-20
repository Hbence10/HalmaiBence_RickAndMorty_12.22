const seasons : number[][] = [[1,11], [12, 22], [22, 32], [32, 42], [42, 52]];
const episodeListContainer : HTMLDivElement = document.getElementById("episodeContainer") as HTMLDivElement;


async function getEpisodes(wantedSeason : number){
    console.log("-")

    const selectedSeason : number[] = seasons[wantedSeason]
    const seasonEpisodes : Episode[] = []

    for(let i : number = selectedSeason[0]; i < selectedSeason[1]; i++){
        let apiCall : Promise<any> = (await fetch(`https://rickandmortyapi.com/api/episode/${i}`)).json()
        let apiData : Promise<any> = await apiCall

        console.log(apiData)
    }
}


function selectSeason(wantedSeason : number){
    getEpisodes(wantedSeason)
}