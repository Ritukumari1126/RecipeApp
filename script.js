const searchBox = document.querySelector('.searchBox')
const searchBtn = document.querySelector('.searchBtn')
const recipeContainer = document.querySelector('.recipe-container')
const recipeDetailsContent = document.querySelector('.recipe-details-content')
const recipeDetails = document.querySelector('.recipe-details')

const fetchRecipe = async(q)=>{
    recipeContainer.innerHTML = "<h2>Fetching recipes..</h2>"
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
    const response = await data.json()
    {/*console.log(response.meals[0])*/}
    recipeContainer.innerHTML = "";
      if (!response.meals) {
    recipeContainer.innerHTML = "<h2>No recipes found. Try another keyword.</h2>";
    return;
}
   { response.meals.forEach(meal =>{
        console.log(meal)
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src = "${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea}</p>
            <p><span> Belongs to ${meal.strCategory} Category</span></p>
        
        `
        const button = document.createElement('button')
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        // Adding EventListener to recipe button
        button.addEventListener('click',()=>{
            openRecipePopup(meal)
        })
        recipeContainer.appendChild(recipeDiv)
    })}

  

    console.log(response)
}

const fetchIngredients = (meal)=>{
    let ingredientsList = "";
    for(let i = 1;i<=20;i++){
        const ingredients = meal[`strIngredient${i}`];
        if(ingredients){
            const measure = meal[`strMeasure${i}`]
            ingredientsList += `<li> ${measure} ${ingredients}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal)=>{ 
   recipeDetailsContent.innerHTML = `
    <h2 class = "recipeName"> ${meal.strMeal}</h2>
    <h3> Ingredients </h3>
    <ul class = "ingredientsList">${fetchIngredients(meal)}</ul>
    <div>
        <h3> Instructions..</h3>
        <p class = "recipeInstructions">${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = "block"
}

recipeDetails.addEventListener('click' ,()=>{
    recipeDetailsContent.parentElement.style.display = "none"
});

searchBtn.addEventListener('click' , (e)=>{
    e.preventDefault()
    const searchInput = searchBox.value.trim()
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in the search box ...</h2>`
        return;
    }
    fetchRecipe(searchInput)
   // console.log("search your recipe")
})