import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  const{loading , cocktailList} = useGlobalContext();
  if(loading){
    return  <Loading />
  }

  if(cocktailList.length < 1){
    return(
      <h2 className="section-heading">No Cocktails Matched Your Search Criteria</h2>
    )
  }

  return (
    <section className="section-cocktail">
      <div className="heading-cocktail">
          <h1>Cocktails</h1>
          {/* <div className="underline"></div> */}
      </div>
      <div className="cocktail-display">
        {cocktailList.map((item)=>{
          return <Cocktail key={item.id} {...item} />
        })}
      </div>
    </section>
  )
}

export default CocktailList
