let searchContent = document.getElementById('search-content')
let sideBar = document.getElementById('sidebar')
$(document).ready(() => {
    $(".loading").fadeOut(500)
})
function open() {
    $('aside').animate({
        left: 0
    })
    for (let i = 0; i < 5; i++) {
        $(".urls li").eq(i).animate({ top: 0 }, i * 200)
    }
    $("#open").addClass('d-none');
    $("#close").removeClass('d-none');
}
function close() {
    $('aside').animate({
        left: -260 + 'px'
    })
    for (let i = 0; i < 5; i++) {
        $(".urls li").eq(i).animate({ top: 200 + 'px' }, i * 100)
    }
    $("#open").removeClass('d-none');
    $("#close").addClass('d-none');
}
close()
$('#open').click(function () {
    open();
})
$('#close').click(function () {
    close();
})
//category tab fns
async function meals() {
    $(".loading-in").fadeIn()
    let mealsDetails = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let result = await mealsDetails.json();
    displayCategory(result.categories)
    close()
    searchContent.innerHTML = ''
    $(".loading-in").fadeOut(500)
}
function displayCategory(obj) {
    $(".loading-in").fadeIn()
    let mealContent = '';
    for (let i = 0; i < obj.length; i++) {
        mealContent += `<div class="col-md-3 mb-4">
        <div class="img-content position-relative bg-white overflow-hidden rounded-2">
            <img src='${obj[i].strCategoryThumb}' alt="" class="w-100">
            <div class="over-lay position-absolute d-flex align-items-center justify-content-between">
                <h2 class="ms-2">${obj[i].strCategory}</h2>
            </div>
        </div>
    </div>`
    }
    document.getElementById('meal-content').innerHTML = mealContent
    $(".loading-in").fadeOut(500)
}
function displayCategory(obj) {
    $(".loading-in").fadeIn()
    let mealContent = '';
    for (let i = 0; i < obj.length; i++) {
        mealContent += `<div class="col-md-3 mb-4">
        <div class="img-content position-relative overflow-hidden rounded-2" onclick="innerCategory('${obj[i].strCategory}')">
            <img src='${obj[i].strCategoryThumb}' alt="" class="w-100">
            <div class="over-lay position-absolute text-center p-2">
                <h2 class="ms-2">${obj[i].strCategory}</h2>
                <p class="fs-6 ms-1">${obj[i].strCategoryDescription.split(' ').slice(0, 20).join(' ')}
            </div>
        </div>
    </div>`
    }
    document.getElementById('meal-content').innerHTML = mealContent
    $(".loading-in").fadeOut(500)
}
async function innerCategory(obj) {
    $(".loading-in").fadeIn()
    let mealsDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${obj}`);
    let result = await mealsDetails.json();
    displayAreaMeals(result.meals.slice(0, 20))
    $(".loading-in").fadeOut(500)
}
$('#Categories').click(meals);
// search fns
function catchSearch() {
    document.getElementById('meal-content').innerHTML = ''
    searchContent.innerHTML = `<div class="row mt-3">
    <div class="col-md-6">
        <input type="text" class="form-control bg-transparent text-white" placeholder="Search By Name" oninput="searchMeals(this.value)">
    </div>
    <div class="col-md-6">
        <input type="text"  class="form-control bg-transparent text-white"  placeholder="Search By First Letter" maxlength="1" oninput="searchMealsLetter(this.value)">
    </div>
</div>`
    close()
}
async function searchMeals(val) {
    $(".loading-in").fadeIn()
    let mealsDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
    let result = await mealsDetails.json();
    if (result.meals == null) {
        result.meals = []
    } else {
        displayAreaMeals(result.meals)
    }
    $(".loading-in").fadeOut(500)
}
searchMeals('')
async function searchMealsLetter(val) {
    $(".loading-in").fadeIn()
    if (val == '') {
        val = 'a'
    }
    let mealsDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`);
    let result = await mealsDetails.json();
    if (result.meals) {
        displayAreaMeals(result.meals)

    } else {
        displayAreaMeals([])
    }
    $(".loading-in").fadeOut(500)
}
$('#search').click(catchSearch);
//area tab fns
async function mealArea() {
    searchContent.innerHTML = ''
    let mealsDetails = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let result = await mealsDetails.json();
    displayMealArea(result.meals)
    close()
}
function displayMealArea(obj) {
    close()
    $(".loading-in").fadeIn()
    let mealContent = '';
    for (let i = 0; i < obj.length; i++) {
        mealContent += ` 
        <div class="col-md-3">
            <div class="rounded-2 text-center text-white" onclick="areaDetails('${obj[i].strArea}')" style="cursor:pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${obj[i].strArea}</h3>
            </div>
        </div>`
    }
    document.getElementById('meal-content').innerHTML = mealContent
    $(".loading-in").fadeOut(500)

}
async function areaDetails(area) {
    let mealsDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let result = await mealsDetails.json();
    displayAreaMeals(result.meals.slice(0, 20))
}
function displayAreaMeals(obj) {
    close()
    $(".loading-in").fadeIn()
    let mealContent = '';
    for (let i = 0; i < obj.length; i++) {
        mealContent += `<div class="col-md-3 mb-4">
        <div class="img-content position-relative bg-white overflow-hidden rounded-2" onclick="areaMealDetail(${obj[i].idMeal})">
            <img src='${obj[i].strMealThumb}' alt="" class="w-100">
            <div class="over-lay position-absolute d-flex align-items-center justify-content-between">
                <h3 class="ms-2">${obj[i].strMeal}</h3>
            </div>
        </div>
    </div>`
    }
    document.getElementById('meal-content').innerHTML = mealContent
    $(".loading-in").fadeOut(500)
}

async function areaMealDetail(id) {
    let mealsDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let result = await mealsDetails.json();
    areaMealDetails(result.meals[0])
}
$('#area').click(mealArea);
// ingredient tab fns
async function ingredient() {
    $(".loading-in").fadeIn()
    let mealsDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let result = await mealsDetails.json();
    displayIngredients(result.meals.slice(0, 20))
    close()
    $(".loading-in").fadeOut(500)
}
function displayIngredients(obj) {
    close()
    $(".loading-in").fadeIn()
    let mealContent = '';
    for (let i = 0; i < obj.length; i++) {
        mealContent += ` 
<div class="col-md-3 text-white text-center mb-4" style="cursor:pointer" onclick="getIngredientMeal('${obj[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${obj[i].strIngredient}</h3>
                <p>${obj[i].strDescription.split(' ').slice(0, 20).join(' ')}</p>
            </div>
`
    }
    document.getElementById('meal-content').innerHTML = mealContent
    $(".loading-in").fadeOut(500)

}

async function getIngredientMeal(id) {
    $(".loading-in").fadeIn()
    let mealsDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`);
    let result = await mealsDetails.json();
    console.log(result);
    displayIngredientsmeals(result.meals)
    $(".loading-in").fadeOut(500)


}
function displayIngredientsmeals(obj) {
    close()
    $(".loading-in").fadeIn()
    let mealContent = '';
    for (let i = 0; i < obj.length; i++) {
        mealContent += `<div class="col-md-3 mb-4">
        <div class="img-content position-relative bg-white overflow-hidden rounded-2" onclick="mealDetail(${obj[i].idMeal})">
            <img src='${obj[i].strMealThumb}' alt="" class="w-100">
            <div class="over-lay position-absolute d-flex align-items-center justify-content-between">
                <h3 class="ms-2">${obj[i].strMeal}</h3>
            </div>
        </div>
    </div>`
    }
    document.getElementById('meal-content').innerHTML = mealContent

    $(".loading-in").fadeOut(500)

}
async function mealDetail(id) {
    let mealsDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let result = await mealsDetails.json();
    areaMealDetails(result.meals[0])


}
// display fn
function areaMealDetails(obj) {
    close()
    searchContent.innerHTML = ''
    $(".loading-in").fadeIn()
    let cartona = ''
    for (let i = 1; i <= 20; i++) {
        if (obj[`strIngredient${i}`]) {
            cartona += `
        <li class="me-2 mb-3 rec">${obj[`strMeasure${i}`]} ${obj[`strIngredient${i}`]} </li>
        `
        }
    }
    let tag = []
    if (obj.strTags == null) {
        tag = []
    } else {
        tag = obj.strTags.split(',');
    }
    let tagName = ''
    for (let i = 0; i < tag.length; i++) {
        tagName += `
        <li class="me-3 tag">${tag[i]}</li>
        `
    }
    let mealContent = `
        <div class="left col-md-4">
        <img src="${obj.strMealThumb}" class="w-100 rounded-2" alt="">
        <h2 class="text-white">${obj.strMeal}</h2>
    </div>
    <div class="right col-md-8">
        <h3 class="text-white">Instructions</h3>
        <p class="text-white">${obj.strInstructions}</p>
        <div class="details">
            <h3 class="text-white">Area : ${obj.strArea}</h3>
            <h3 class="text-white">Category : ${obj.strCategory}</h3>
            <h3 class="text-white mb-3">Recipes :</h3>
            <ul class="list-unstyled text-white d-flex recipes ms-3 flex-wrap">
                ${cartona}                
            </ul>
            <h3 class="text-white mb-3">Tags :</h3>
            <ul class="list-unstyled text-white tags d-flex ms-3 mb-4">
                ${tagName}
            </ul>
            <div class="social">
                <a href="${obj.strSource}" target="_blank" class="text-white btn btn-success">Source</a>
                <a href="${obj.strYoutube}" target="_blank" class="text-white btn btn-danger">Youtube</a>
            </div>
        </div>

    </div>`
    document.getElementById('meal-content').innerHTML = mealContent
    $(".loading-in").fadeOut(500)
}

async function ingredient() {
    searchContent.innerHTML = ''
    $(".loading-in").fadeIn()
    let mealsDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let result = await mealsDetails.json();
    displayIngredients(result.meals.slice(0, 20))
    close()
    $(".loading-in").fadeOut(500)
}
$('#ingredients').click(ingredient);
function displayIngredients(obj) {
    let mealContent = '';
    for (let i = 0; i < obj.length; i++) {
        mealContent += ` 
<div class="col-md-3 text-white text-center mb-4" style="cursor:pointer" onclick="getIngredientMeal('${obj[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${obj[i].strIngredient}</h3>
                <p>${obj[i].strDescription.split(' ').slice(0, 20).join(' ')}</p>
            </div>
`
    }
    document.getElementById('meal-content').innerHTML = mealContent
}
// contact inputs
let enanbleUser = false,
    enanbleEmail = false,
    enanblePhone = false,
    enanbleAge = false,
    enanblePass = false,
    enanbleRepass = false;
function showContact() {
    searchContent.innerHTML = ''
    document.getElementById('meal-content').innerHTML = ''
    let content = `
    <div class="col-md-6 mb-4">
            <input type="text" class="form-control bg-white text-black mb-2" placeholder="Enter Your Name" id="name" oninput="check()">
            <p class="text-center rec d-none" id="namePara">Special characters and numbers not allowed</p>
            
        </div>
        <div class="col-md-6 mb-4">
            <input type="email"  class="form-control bg-white text-black mb-2"  placeholder="Enter Your Email" id="email" oninput="check()">
            <p class="text-center rec d-none" id="emailPara" >you must enter like (mina@gmail.com )</p>

        </div>
        <div class="col-md-6 mb-4">
            <input type="tel" class="form-control bg-white text-black mb-2" placeholder="Enter Your Phone" id="phone" oninput="check()">
            <p class="text-center rec d-none" id="phonePara">Enter valid egyptian Phone Number</p>

        </div>
        <div class="col-md-6 mb-4">
            <input type="number"  class="form-control bg-white text-black mb-2"  placeholder="Enter Your Age" id="age" oninput="check()">
            <p class="text-center rec d-none" id="agePara">Enter valid age betwwen (1 to 99 ) </p>

        </div>
        <div class="col-md-6 mb-4">
            <input type="password" class="form-control bg-white text-black mb-2" placeholder="Enter Your Password" id="pass" oninput="check()">
            <p class="text-center rec d-none" id="passPara">Enter valid password (Minimum eight characters, at least one capital letter and one number)</p>

        </div>
        <div class="col-md-6 mb-4">
            <input type="password"  class="form-control bg-white text-black mb-2"  placeholder="Please retype Your Password" id="repass" oninput="check()">
            <p class="text-center rec d-none" id="repassPara">dose not match</p>

        </div>
        <button type="button" class="btn btn-outline-danger  m-auto" disabled  id="button" onclick="sub()">Submit</button>
    `
    document.getElementById('contact-inputs').innerHTML = content
    close()
    document.getElementById("name").addEventListener("focus", () => {
        enanbleUser = true
    })

    document.getElementById("email").addEventListener("focus", () => {
        enanbleEmail = true
    })

    document.getElementById("phone").addEventListener("focus", () => {
        enanblePhone = true
    })

    document.getElementById("age").addEventListener("focus", () => {
        enanbleAge = true
    })

    document.getElementById("pass").addEventListener("focus", () => {
        enanblePass = true
    })

    document.getElementById("repass").addEventListener("focus", () => {
        enanbleRepass = true
    })
}
function check() {
    let nameRegex = /^[A-z]{1,}$/;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let phoneRegex = /^(01)[0-2][0-245789][0-9]{7}$/;
    let ageRegex = /^([1-9]|[0-9][0-9])$/;
    let passRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[A-z]).{8,}$/;
    let repassRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[A-z]).{8,}$/;
    let user = document.getElementById('name')
    let email = document.getElementById('email')
    let phone = document.getElementById('phone')
    let age = document.getElementById('age')
    let pass = document.getElementById('pass')
    let repass = document.getElementById('repass')
    if (enanbleUser) {
        if (nameRegex.test(user.value)) {
            document.getElementById('namePara').classList.add('d-none')
        } else {
            document.getElementById('namePara').classList.remove('d-none')

        }
    }
    if (enanbleEmail) {
        if (emailRegex.test(email.value)) {
            document.getElementById('emailPara').classList.add('d-none')
        } else {
            document.getElementById('emailPara').classList.remove('d-none')

        }
    }

    if (enanblePhone) {
        if (phoneRegex.test(phone.value)) {
            document.getElementById('phonePara').classList.add('d-none')
        } else {
            document.getElementById('phonePara').classList.remove('d-none')

        }
    }
    if (enanbleAge) {
        if (ageRegex.test(age.value)) {
            document.getElementById('agePara').classList.add('d-none')
        } else {
            document.getElementById('agePara').classList.remove('d-none')

        }
    }
    if (enanblePass) {
        if (passRegex.test(pass.value)) {
            document.getElementById('passPara').classList.add('d-none')
        } else {
            document.getElementById('passPara').classList.remove('d-none')

        }
    }

    if (enanbleRepass) {
        if (repass.value === pass.value && repassRegex.test(repass.value) === passRegex.test(pass.value)) {
            document.getElementById('repassPara').classList.add('d-none')

        } else {
            document.getElementById('repassPara').classList.remove('d-none')

        }
    }


    if (nameRegex.test(user.value) && emailRegex.test(email.value) && phoneRegex.test(phone.value) && ageRegex.test(age.value) && passRegex.test(pass.value) && repassRegex.test(repass.value) == true) {
        document.getElementById('button').removeAttribute('disabled')

    } else {
        document.getElementById('button').setAttribute('disabled', true)
    }
}
$('#contact').click(showContact)
// button change fn
function sub() {
    document.getElementById('button').style.boxShadow = '0px 0px 10px #dc3545'
    document.getElementById('button').style.backgroundColor = '#dc3545'
    document.getElementById('button').style.color = '#fff'
}
