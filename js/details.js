export class GameDetails {
    constructor() {

    }
async GetGameDetails(gameId) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd4cbd1ff51msh32197c95ceaaeb1p1ddfffjsn8398d37ac707',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    const apiData = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, options)
    const response =await apiData.json();
    if(response){
      $(".loading").fadeOut(50, function(){
        $("#detailSection").removeClass("hidden");
        $("body").removeClass("overFlow");
      })
    let uiContainer = ``;
    const mainUi = document.querySelector("#detailSection");
        uiContainer+= `<div class="container">
        <header class="hstack justify-content-between">
           <h1 class="text-center h3 py-4">Details Game</h1>
           <button class="btn-close btn-close-white" id="btnClose"></button>
        </header>
        <div class="row g-4" id="detailsContent">
   <div class="col-md-4">
   <img src="${response.thumbnail}" class="w-100" alt="image details">
   </div>
   <div class="col-md-8">
   <h3>Title: ${response.title}</h3>
   <p>Category: <span class="badge text-bg-info"> ${response.genre}</span> </p>
   <p>Platform: <span class="badge text-bg-info"> ${response.platform}</span> </p>
   <p>Status: <span class="badge text-bg-info"> ${response.status}</span> </p>
   <p class="small">${response.description}</p>
   <a class="btn btn-outline-warning" target="_blank" href="${response.game_url}">Show Game</a>
   </div>
   </div>
     </div>`
    
    mainUi.innerHTML = uiContainer;
    $("#btnClose").on("click",function(){
      $("#gamesUi").removeClass("hidden");
      $("#mainSection").removeClass("hidden");
      $("#detailSection").addClass("hiddenDetail");
    });
  }else{
    $(".loading").fadeIn(50);
    $("body").addClass("overFlow");
  };
  }
}
