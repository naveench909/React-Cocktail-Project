import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()



const AppProvider = ({ children }) => {
  const[loading , setLoading] = useState(true);
  const[searchTerm , setSearchTerm] = useState('')
  const [cocktailList , setCocktailList] = useState([]);

  const getData = useCallback(async()=>{
    setLoading(true);
    try{
      const response = await fetch(`${url}${searchTerm}`);
      const cocktailData = await response.json();
      const{drinks} = cocktailData;
      if(drinks){
        const newCocktails = drinks.map((item)=>{
          const{idDrink,strDrink,strDrinkThumb,strAlcoholic,strGlass} = item
          return{
            id:idDrink , name:strDrink , image:strDrinkThumb , info:strAlcoholic , glass:strGlass
          }
        })
        setCocktailList(newCocktails);
      }else{
        setCocktailList([])
      }
      setLoading(false)
    }catch(error){
      console.log(error);
      setLoading(false)
    }
  },[searchTerm])

  useEffect(()=>{
    getData();
  },[searchTerm,getData])

  return <AppContext.Provider 
    value={{
      loading,
      cocktailList,
      setCocktailList,
      setSearchTerm,
      getData
    }}>
    
    
    {children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider}
