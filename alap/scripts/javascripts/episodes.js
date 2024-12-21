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
const seasons = [[1, 11], [12, 22], [22, 32], [32, 42], [42, 52]];
const episodeListContainer = document.getElementById("episodeContainer");
// Az adott evad reszeit leszedi
async function getEpisodes(wantedSeason) {
    console.log("-");
    const selectedSeason = seasons[wantedSeason];
    const seasonEpisodes = [];
    for (let i = selectedSeason[0]; i < selectedSeason[1]; i++) {
        let apiCall = (await fetch(`https://rickandmortyapi.com/api/episode/${i}`)).json();
        let apiData = await apiCall;
        // seasonEpisodes.push()
        console.log(apiData);
    }
    setDetails(seasonEpisodes);
}
// Az adott evad reszeit beallitja az oldalon
function setDetails(episodes) {
}
// Evad kivalasztas
function selectSeason(wantedSeason) {
    getEpisodes(wantedSeason);
}
