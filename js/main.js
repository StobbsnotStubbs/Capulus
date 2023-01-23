const hotCoffeeAPI = "https://api.sampleapis.com/coffee/hot"
const icedCoffeeAPI = "https://api.sampleapis.com/coffee/iced"
const generateBtn = document.querySelector(".generate");
const tempToggle = document.querySelector(".tempToggle");
const CoffeeName = document.querySelector(".CoffeeName");
const CoffeeDetails = document.querySelector(".CoffeeDetails");
const CoffeeIngredients = document.querySelector(".CoffeeIngredients");
const CoffeeImage = document.querySelector(".CoffeeImage");
const coffeeLister = document.querySelector(".coffeeLister");

(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    

    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

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
        document.getElementById("listContainer").innerHTML = ""
        let searchValue = document.getElementById("search_input").value;
        let searchValueFixed = searchValue.charAt(0).toUpperCase() + searchValue.slice(1)
        let result = coffeeDrink.find(coffeeDrink => coffeeDrink.title == searchValueFixed)
        if (result == undefined) {
        CoffeeName.textContent = "Try Another!"
        CoffeeIngredients.textContent = ""
        CoffeeDetails.textContent = ""
        CoffeeImage.innerHTML = ""
        }
        else {
            CoffeeName.textContent = result.title
        }
        CoffeeIngredients.textContent = result.ingredients //gives comma no space
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
        document.getElementById("listContainer").innerHTML = ""
        let searchValue = document.getElementById("search_input").value;
        let searchValueFixed = searchValue.charAt(0).toUpperCase() + searchValue.slice(1)
        let result = coffeeDrink.find(coffeeDrink => coffeeDrink.title == searchValueFixed)
        if (result == undefined) {
            CoffeeName.textContent = "Try Another!"
            CoffeeIngredients.textContent = ""
            CoffeeDetails.textContent = ""
            CoffeeImage.innerHTML = ""
            }
            else {
                CoffeeName.textContent = result.title
            }
        CoffeeIngredients.textContent = result.ingredients[0] + " " + result.ingredients[1] + result.ingredients[2]
        CoffeeDetails.textContent = result.description
        let coffeeImageData =  result.image
        coffeeImageDataNoQuotes = coffeeImageData
        CoffeeImage.innerHTML = `<img style=" object-fit: contain; width: 100%; height: 60vh;" src="${coffeeImageDataNoQuotes}" />`
        
        
    })
    .catch((error) => console.error("FETCH ERROR:", error));
    e.preventDefault();
}}

coffeeLister.addEventListener("click", showData)


async function showData() {
  if (tempToggle.textContent === "Hot") {
    try {
        const resp1 = await fetch(hotCoffeeAPI);
        const json1 = await resp1.json();

        // Use reduce to create the list items
        const listItems = json1.reduce((acc, curr) => {
            return acc + `<li>${curr.title}</li>`;
        }, "");

        // Create the list element
        const list = `<ul style="color: white;">${listItems}</ul>`;

        // Append the list to the document
        document.getElementById("listContainer").innerHTML = list;
    } catch (err) {
        console.error(err);
    }
}
else {
    try {
        const resp1 = await fetch(icedCoffeeAPI);
        const json1 = await resp1.json();

        // Use reduce to create the list items
        const listItems = json1.reduce((acc, curr) => {
            return acc + `<li>${curr.title}</li>`;
        }, "");

        // Create the list element
        const list = `<ul style="color: white;">${listItems}</ul>`;

        // Append the list to the document
        document.getElementById("listContainer").innerHTML = list;
    } catch (err) {
        console.error(err);
    }
}}