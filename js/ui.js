import { GameDetails } from "./details.js";
let gameDetail = new GameDetails();

export class GameCategory {
    constructor() {
        this.chooseCategory = document.getElementsByClassName("nav-link");
        Array.from(this.chooseCategory).forEach(element => {
          element.addEventListener("click", this.adjustActive.bind(this));
        });
        this.home = document.querySelector("#gamesUi");
        let category;
        category= Array.from(this.chooseCategory).find(element => element.classList.contains("active")).getAttribute("data-category");
        this.GetGames(category);
      }
      adjustActive(e){
        Array.from(this.chooseCategory).forEach(element => {element.classList.remove("active");});
      e.currentTarget.classList.add("active");
      this.GetGames(e.currentTarget.getAttribute("data-category"));
      $(".loading").fadeIn(50, function(){
        $("#gamesUi").addClass("hidden");
      })
      }
      async GetGames(category) {

        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'd4cbd1ff51msh32197c95ceaaeb1p1ddfffjsn8398d37ac707',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
          }
        };
        const apiData = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category?category:"mmorpg"}`, options)
        const response =await apiData.json();
        if(response){
          $(".loading").fadeOut(50, function(){
            $("#gamesUi").removeClass("hidden");
            $("body").removeClass("overFlow");
          })
        let uiContainer = ``;
        const mainUi = document.querySelector("#gamesUi");
        for(let i=0 ; i< response.length ; i++){
            uiContainer+= `<div class="col-md-6 col-lg-4 col-xl-3">
            <div class="card shadow-sm   bg-transparent">
              <div class="card-body position-relative p-3 custom-card-body text-center">
                  <img src="${response[i].thumbnail}" class="card-img-top mb-3" alt="nature">
                  <div class="d-flex justify-content-between">
                <p class="fs-6 text-white mb-0">${response[i].title}</p>
                <span class="badge text-bg-primary p-2">Free</span>
              </div>
              <p class="card-text text-secondary fs-6 ">${response[i].short_description}</p>
              </div>
              <div class="card-footer text-white d-flex align-items-center justify-content-between my-0 py-2 px-3">
                  <p class="my-0 like-btns">${response[i].genre}</p>
                  <p class="my-0 like-btns">${response[i].platform}</p>
              </div>
            </div>
        </div>`
        }
        mainUi.innerHTML = uiContainer;
        $(".card").on("click", function () {
          const gameId =
          response[$(this).closest(".col-md-6").index()].id;

          $(".loading").fadeIn(50, function(){
            $("body").addClass("overFlow");
        $("#gamesUi").addClass("hidden");
        $("#mainSection").addClass("hidden");
          $("#detailSection").removeClass("hiddenDetail");
      })
          gameDetail.GetGameDetails(gameId);
      });
      }else{
        $(".loading").fadeIn(50);
        $("body").addClass("overFlow");
      };
    };
};
