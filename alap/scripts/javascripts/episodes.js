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
const seasonCharacters = [];
const episodeListContainer = document.getElementById("episodeContainer");
// Az adott evad reszeit leszedi
async function getEpisodes(wantedSeason) {
    episodeListContainer.style.display = "";
    const selectedSeason = seasons[wantedSeason];
    const seasonEpisodes = [];
    for (let i = selectedSeason[0]; i < selectedSeason[1]; i++) {
        let apiCall = (await fetch(`https://rickandmortyapi.com/api/episode/${i}`)).json();
        let apiData = await apiCall;
        seasonEpisodes.push(new SeasonEpisode(apiData["id"], apiData["name"], apiData["air_date"], apiData["episode"][2], apiData["characters"]));
    }
    setDetails(seasonEpisodes, wantedSeason);
}
// Az adott evad reszeit beallitja az oldalon
function setDetails(episodes, selectedSeason) {
    document.getElementById("seasonTitle").innerHTML = `${selectedSeason + 1}. Season`;
    document.getElementById("posterImg").src = `../images/posters/season${selectedSeason + 1}.jpg`;
}
// Evad kivalasztas
function selectSeason(wantedSeason) {
    getEpisodes(wantedSeason);
}
