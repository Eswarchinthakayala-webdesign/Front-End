let result=document.getElementById('result')
let searchBtn=document.getElementById('search-btn')
const url="https://www.themealdb.com/api/json/v1/1/search.php?s="

searchBtn.addEventListener('click',()=>{
    let input=document.getElementById('input')
    let search=input.value.trim()
    if(search.length==0)
    {
        result.innerHTML = `<h4 class="error">Please Enter Dish Name 😔.</h4>`;
        return
    }
       
    result.innerHTML = `<h4 class="loading">Loading...</h4>`;
    searchBtn.disabled = true;
fetch(`${url}${search}`).then((response)=>
{
   if(!response.ok)
   {
    throw new Error ("Recipe Not Found")
   }
   return response.json()

}).then(data=>
{
    console.log(data)

    let myMeal=data.meals[0];
    console.log(myMeal.strMeal)

    let count=1;
    let ingredients=[];
    for(let i in myMeal)
    {   
        let ingredient=""
        let measure=""
        if(i.startsWith("strIngredient") && myMeal[i])
        {
            ingredient=myMeal[i]
            measure=myMeal[`strMeasure`+count]
            count++;
            // console.log(ingredient,measure)

            ingredients.push(`${measure} ${ingredient}`)
        }
    }
    console.log(ingredients)

    result.innerHTML=`
    <img src=${myMeal.strMealThumb}
    >
    <div class="details">
    <h2>${myMeal.strMeal}</h2>
    <h4>${myMeal.strArea}</h4>
    </div>
    <div id="ingredient-con"></div>
    <div id="recipe">
    <button id="hide-recipe">X</button>
    <pre id="instructions">${myMeal.strInstructions}</pre>
    </div>
    <button id="show-recipe">View Recipe</button>`

    let ingredientCon=document.getElementById('ingredient-con')
    let ul=document.createElement('ul')
    let recipe=document.getElementById('recipe')
    let hideRecipe=document.getElementById('hide-recipe')
    let showRecipe=document.getElementById('show-recipe')
    ingredients.forEach(i=>
    {
        let li=document.createElement('li')
        li.innerText=i
        ul.appendChild(li)  
        ingredientCon.appendChild(ul)  
    }
    )
    hideRecipe.addEventListener('click',()=>
    {
        recipe.style.display="none"
    })
    showRecipe.addEventListener('click',()=>
    {
         recipe.style.display="block"
    })

}
).catch(err=>
{
    result.innerHTML = `<h4 class="error">Recipe Not Found 😔.</h4>`;
}
).finally(() => {
    searchBtn.disabled = false;
});
})