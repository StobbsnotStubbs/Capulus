const hotCoffeeAPI = "https://api.sampleapis.com/coffee/hot"
const icedCoffeeAPI = "https://api.sampleapis.com/coffee/iced"
const generateBtn = document.querySelector(".generate");
const tempToggle = document.querySelector(".tempToggle");
const CoffeeName = document.querySelector(".CoffeeName");
const CoffeeDetails = document.querySelector(".CoffeeDetails");
const CoffeeIngredients = document.querySelector(".CoffeeIngredients");
const CoffeeImage = document.querySelector(".CoffeeImage");



generateBtn.addEventListener("click", searchBeverage);



tempToggle.addEventListener("click", flipTemp);

function flipTemp(e) {
    if (tempToggle.style.backgroundColor === "lightblue") {
        // If the color is red, change it to blue
        tempToggle.style.backgroundColor = "darkred";
        tempToggle.textContent = "Hot"
    } else {
        // If the color is not red, change it to red
        tempToggle.style.backgroundColor = "lightblue";
        tempToggle.textContent = "Iced"
    }
}

async function searchBeverage(e, searchValue) {
    if (tempToggle.textContent === "Hot" ) {
fetch(hotCoffeeAPI)
.then((response) => {
    if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => coffeeDrink = data)
    .then((coffeeDrink) => {
        let searchValue = document.getElementById("search_input").value;
        let searchValueFixed = searchValue.charAt(0).toUpperCase() + searchValue.slice(1)
        let result = coffeeDrink.find(coffeeDrink => coffeeDrink.title == searchValueFixed)
        CoffeeName.textContent = result.title
        CoffeeIngredients.textContent = result.ingredients
        CoffeeDetails.textContent = result.description
        let coffeeImageData =  result.image
        coffeeImageDataNoQuotes = coffeeImageData
        CoffeeImage.innerHTML = `<img style=" object-fit: contain; width: 100%; height: 60vh;" src="${coffeeImageDataNoQuotes}" />`
        
    })

    .catch((error) => console.error("FETCH ERROR:", error));
    e.preventDefault();
}
else {
fetch(icedCoffeeAPI)
.then((response) => {
    if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => coffeeDrink = data)
    .then((coffeeDrink) => {
        let searchValue = document.getElementById("search_input").value;
        let searchValueFixed = searchValue.charAt(0).toUpperCase() + searchValue.slice(1)
        let result = coffeeDrink.find(coffeeDrink => coffeeDrink.title == searchValueFixed)
        CoffeeName.textContent = result.title
        CoffeeIngredients.textContent = result.ingredients[0] + " " + result.ingredients[1] + result.ingredients[2]
        CoffeeDetails.textContent = result.description
        let coffeeImageData =  result.image
        coffeeImageDataNoQuotes = coffeeImageData
        CoffeeImage.innerHTML = `<img style=" object-fit: contain; width: 100%; height: 60vh;" src="${coffeeImageDataNoQuotes}" />`
        
    })
    .catch((error) => console.error("FETCH ERROR:", error));
    e.preventDefault();
}}


