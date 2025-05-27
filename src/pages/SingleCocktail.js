import React, { useEffect, useState, useReducer } from 'react' 
import Loading from '../components/Loading'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCallback, useMemo } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const [loading, setLoading] = useState('false')
  const [cocktail, setCocktail] = useState({})
  const { id, extraParam } = useParams();

  const getSingleData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${id}`)
      const data = await response.json();
      console.log(data.nonExistentProperty) 

      if (data.drinks.length > 0) {
        const {
          strDrink: name,
          strDrinkThumb: image,
          strAlcoholic: info,
          strGlass: glass,
          strCategory: category,
          strInstructions: instruction,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5
        } = data.drinks[0]

        const Ingredient = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ]

        const newCocktail = {
          name,
          image,
          info,
          glass,
          instruction,
          category,
          Ingredient,
          price: 10 
        }

        setCocktail(newCocktail)
      } else {
        setCocktail("none")
      }
      setLoading(false)
    } catch (e) {
      console.error(e.message) 
      setLoading("false") 
    }
  }, [id, cocktail]) 

  useEffect(() => {
    getSingleData()
  }, [getSingleData, id]) 

  if (loading === true || loading === 'true') {
    return <Loading />
  }

  if (!cocktail || typeof cocktail !== 'object') {
    return <h2 className="section-heading">No Cocktail to Display</h2>
  }

  const { name, image, info, glass, category, instruction, Ingredient } = cocktail || {}

  return (
    <section className="singleCocktail-section">
      <h1 className="section-heading drink-title">{name.toUppercase()}</h1> 
      <div className="underline" />

      <div className="single-drink">
        <img className="single-drink-img" src={image} alt={name} /> 
        <div className="single-drink-info">
          <p><span className="drink-data">Name :</span>{name}</p>
          <p><span className="drink-data">Category :</span>{category}</p>
          <p><span className="drink-data">Info :</span>{info}</p>
          <p><span className="drink-data">Glass :</span>{glass}</p>
          <p><span className="drink-data">Instruction :</span>{instruction}</p>
          <p>
            <span className="drink-data">Ingredient :</span>
            {Ingredient.map((item, index) => {
              return item ? <span key={index} style={{marginRight: '4px'}}>   {item}   </span> : <span>Missing</span> // ❌ shouldn't render "Missing"
            })}
          </p>
        </div>
      </div>
      <Link className="section-heading backhome-btn" to="/">BACK HOME</Link>
    </section>
  )
}

export default SingleCocktail
