import React from 'react'
import './index.css'
import close from './assets/close.svg'
import { useState } from 'react';

function Card({myMeal}) {
  // console.log("myMealct=",myMeal);
  let count=1;
  let ingredients=[];
  for(let i in myMeal){
      let ingredient="";
      let measure="";
      if(i.startsWith("strIngredient") && myMeal[i]){
          ingredient=myMeal[i];
          measure=myMeal["strMeasure"+count];
          count++;
          // console.log(ingredient, measure);
          ingredients.push(`${measure} ${ingredient}`);
      }
  }

  const [view, setView]=useState(true)
  function handelClick(){
    setView((prev)=>!prev);
  }
  
  return (
    <div id="result">
        <div className="details">
            <img className='img' src={myMeal["strMealThumb"]}/>
            <h1>{myMeal["strMeal"]}</h1>
            <h4>{myMeal["strArea"]}</h4>
        </div>
        {view?(
        <div id="ingredient-con">
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((ingredient,index)=>{
              return <li key={index}>{ingredient}</li>
            })}
          </ul>
          <div style={{width:"350px"}}>
            <button onClick={handelClick} className="bn5" id="show-recipe">View Recipe</button>
            <a href={myMeal["strYoutube"]} target='_blank'> <button className='bn5' id="watch">Watch Video</button></a>
          </div>
        </div>
        ):(
        <div id="recipe">
            <button onClick={handelClick} id="hide-recipe"><img src={close}/></button>
            <div id="instructions">{myMeal["strInstructions"]}</div>
        </div>
        )
        }
        {/* <button id="show-recipe">View Recipe</button> */}
    </div>
  )
}

export default Card