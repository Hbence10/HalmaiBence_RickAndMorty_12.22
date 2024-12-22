const favRow = document.getElementById("favRow");
async function getFavCharacters() {
    let apiCall = (await fetch(`https://rickandmortyapi.com/api/character/1,2,244`)).json();
    let apiData = await apiCall;
    for (let i = 0; i < 3; i++) {
        console.log(apiData[i]);
        favRow.innerHTML += `
            <div class="col-lg-4 d-flex justify-content-center align-items-center my-md-2 my-sm-2 my-2">
                <div class="card" style="width: 18rem;">
                    <img src="${apiData[i].image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h4 class="card-title characterName">${apiData[i].name}</h4>
                        <ul>
                            <li><span class="spanText fw-bold">Status: </span> ${apiData[i].status}</li>
                            <li><span class="spanText fw-bold">Gender: </span> ${apiData[i].gender}</li>
                        </ul>
                        <div class="d-flex justify-content-center align-items-center">
                            <a href="../pages/characters.html" class="btn btn-outline-dark">Go to character list</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    getFavCharacters();
});
