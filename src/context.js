import React, { useState, useContext, useEffect, useReducer } from 'react'
import { useCallback, useMemo } from 'react'

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()
const defaultState = {}

export default function AppProvider({ children }) {
  const[loading , setLoading] = useState(true);
  const [searchTerm , setSearchTerm] = useState('')
  const [cocktailList , setCocktailList] = useState([]);
  const [error, setError] = useState(false)

  const getData = useCallback(async()=> {
    setLoading(true)
    try{
      const response = await fetch(`${URL}${searchTerm}`)
      const cocktailData = await response.json();
      const { drinks } = cocktailData;

      if(drinks.length === 0){
        setCocktailList({})
      }else{
        const newCocktails = drinks.map(item => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
            unusedProp
          } = item
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })
        setCocktailList(newCocktails)
      }
      setLoading(false)
    } catch(error) {
      console.error('Fetching error:', error.message)
      setCocktailList(null)
      setLoading('false')
    }
  }, [searchTerm])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <AppContext.Provider
      value={{
        loading,
        cocktailList,
        setCocktailList,
        setSearchTerm,
        getData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) return null
  return ctx
}

export { AppContext, AppProvider }
