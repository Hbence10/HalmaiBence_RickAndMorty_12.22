const seasons = [[1, 11], [12, 22], [22, 32], [32, 42], [42, 52]];
const episodeListContainer = document.getElementById("episodeContainer");
async function getEpisodes(wantedSeason) {
    console.log("-");
    const selectedSeason = seasons[wantedSeason];
    const seasonEpisodes = [];
    for (let i = selectedSeason[0]; i < selectedSeason[1]; i++) {
        let apiCall = (await fetch(`https://rickandmortyapi.com/api/episode/${i}`)).json();
        let apiData = await apiCall;
        console.log(apiData);
    }
}
function selectSeason(wantedSeason) {
    getEpisodes(wantedSeason);
}
