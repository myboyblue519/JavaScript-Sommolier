// WINE PAIRING APP
const app = {};

app.apiKey = "897d5fbeefc34f42adb50cfbbfb70ac9"
app.apiKey2 = "8161e734602a4734b2d6d521776cfb99"

// HAMBURGER MENU


app.mobileMenu = ()=>{
    app.toggleButton = document.getElementsByClassName("toggleButton")[0]
    app.navBarLinks = document.getElementsByClassName("navBarLinks")[0]
    app.closeHamburgerMenu = document.querySelectorAll('.nav-link');
    
    app.toggleButton.addEventListener ('click', () => {
        app.navBarLinks.classList.toggle('active');
    });
    app.closeHamburgerMenu.forEach((navLink) => {
        app.navBarLinks.addEventListener('click', ()=> {
        app.navBarLinks.classList.remove('active');
    });
});
}

// RADIO MENU
app.whiteWine = document.querySelector('.radio-white');
app.redWine = document.querySelector('.radio-red');
app.whiteList = document.querySelector('.white-wine-list');
app.redList = document.querySelector('.red-wine-list');
app.chooseReminder = document.querySelector('.choose');

// RADIO MENUS SHOW DROP DOWN
app.dropDownSelect = () => {
    app.whiteWine.addEventListener('click', () => {
        app.whiteList.classList.remove('is-hidden');
        app.redList.classList.add('is-hidden');
        app.chooseReminder.classList.add('is-hidden')
    });
    app.redWine.addEventListener('click', () => {
        app.redList.classList.toggle('is-hidden');
        app.whiteList.classList.add('is-hidden');
        app.chooseReminder.classList.add('is-hidden');
    });
}

// PAIR FOOD TO WINE
app.getWine = (query) => {
    const url = new URL("https://api.spoonacular.com/food/wine/dishes")
    url.search = new URLSearchParams({
        apiKey: app.apiKey,
        wine: query,
    });

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.ok)
            }
        })
        .then((apiData) => {
            const resultsParagraph = document.querySelector(".meal-suggestion-text p")
            if (apiData.status == "failure") {
                resultsParagraph.innerText = "To be Updated, Try Again!"

            } else {
                resultsParagraph.innerText = apiData.text

            }
        })
        .catch((error) => {
            if (error.message === "false") {
                alert("Please choose Red or White then a type in the dropdown menu")
            }
        });
};
app.getUserInput = () => {
    const userForm = document.getElementById('wine-form');
    userForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const whiteSelect = document.getElementById('white-options');
        const redSelect = document.getElementById('red-options');

        if (app.whiteWine.checked == true) {
            const userInput = whiteSelect.options[whiteSelect.selectedIndex].value;
            app.getWine(userInput)
        }
        else {
            const userInput = redSelect.options[redSelect.selectedIndex].value;
            app.getWine(userInput);
        }
    });
}

// GET SOMMELIER HELP:
app.sommelier = (mealName) => {
    const wineUrl = new URL ('https://api.spoonacular.com/food/wine/pairing')
    wineUrl.search = new URLSearchParams({
        apiKey: app.apiKey2,
        food: mealName,
    });

    fetch(wineUrl)
        .then((wineResponse) => {
            if (wineResponse.ok) {
                return wineResponse.json();
            } else {
                throw new Error(wineResponse.ok)
            }
        })
        .then((wineData) => {
            const pairingParagraph = document.querySelector(".wine-result")
            if (wineData.status == "failure") {
                pairingParagraph.innerText = "No wine suggestions for that meal, please also double check the spelling"

            } else {
                pairingParagraph.innerText = wineData.pairingText
            }
        })
        .catch((error) => {
            if (error.message === "false") {
                alert("Please enter a cuisine or food type")
            }
        });
};

app.getMealInfo = () => {
    const mealInfo = document.getElementById('food-form')
    mealInfo.addEventListener('submit', function(event){
        event.preventDefault();
        mealName = event.target[0].value.toLowerCase();
        app.sommelier(mealName);
    });
};

// RUN:
app.init = () => {
    app.getUserInput();
    app.dropDownSelect();
    app.getMealInfo();
    app.mobileMenu();
};

app.init();