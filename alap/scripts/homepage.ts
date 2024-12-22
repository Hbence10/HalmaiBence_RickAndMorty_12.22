const favRow : HTMLDivElement = document.getElementById("favRow") as HTMLDivElement

async function getFavCharacters(){
    let apiCall : Promise<any> = (await fetch(`https://rickandmortyapi.com/api/character/1,2,244`)).json()
    let apiData : Promise<any> = await apiCall
    
    for(let i = 0; i < 3; i++){
        console.log(apiData[i])
        favRow.innerHTML += `
            <div class="col-lg-4">
                <div class="card">
                    <img src="${apiData[i].image}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h4 class="card-title characterName">${apiData[i].name}</h4>
                        <ul>
                            <li><span class="spanText fw-bold">Status: </span> ${apiData[i].status}</li>
                            <li><span class="spanText fw-bold">Gender: </span> ${apiData[i].gender}</li>
                        </ul>
                        <button class="btn btn-outline-dark" )">Check Details</button>
                    </div>
                </div>
            </div>
        `
    }
}


document.addEventListener("DOMContentLoaded", () => {
    getFavCharacters()
})
