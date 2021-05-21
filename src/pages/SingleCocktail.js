import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'

import { useCallback } from 'react'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const [loading , setLoading] = useState(false)
  const [cocktail , setCocktail] = useState(null)
  const {id} = useParams();

  const getSingleData = useCallback(async()=>{
    setLoading(true);
   try{
      const response = await fetch(`${url}${id}`)
      const data = await response.json();
      console.log(data.drinks)
      if(data.drinks){
          const{
            strDrink:name ,
            strDrinkThumb:image ,
            strAlcoholic:info ,
            strGlass:glass,
            strCategory: category,
            strInstructions: instruction,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5
          } = data.drinks[0];

          const Ingredient = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5
          ]

          const newCocktail = {
            name , image, info , glass,
            instruction , category,
            Ingredient 
          }

          setCocktail(newCocktail);
      }else{
        setCocktail(null);
      }
      setLoading(false);
   }catch(e){
     console.log(e);
     setLoading(false)
   }
  },[id])
  useEffect(()=>{
    getSingleData();
  },[id,getSingleData])


  if(loading){
    return <Loading />
  }
  if(!cocktail){
    return <h2 className="section-heading">No Cocktail to Display</h2>
  }

  const{name , image , info, glass, category , instruction , Ingredient} = cocktail;

  return (
    <section className="singleCocktail-section"> 
      <h1 className="section-heading drink-title">{name}</h1>
      <div className="underline"></div>

      <div className="single-drink">
        <img className="single-drink-img" src={image} alt="drink-img" />
        <div className="single-drink-info">
          <p>
            <span className="drink-data">Name :</span>{name}
          </p>
          <p>
            <span className="drink-data">Category :</span>{category}
          </p>
          <p>
            <span className="drink-data">Info :</span>{info}
          </p>
          <p>
            <span className="drink-data">Glass :</span>{glass}
          </p>
          <p>
            <span className="drink-data">Instruction :</span>{instruction}
          </p>
          <p>
            <span className="drink-data">Ingredient :</span>
            {Ingredient.map((item,index)=>{
              return item? <span key={index}>   {item}   </span>:null
            })}
          </p>
        </div>
      </div>
      <Link className=" section-heading backhome-btn" to="/">BACK HOME</Link> 
    </section>
  )
}

export default SingleCocktail
