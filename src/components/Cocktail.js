import React from 'react'
import { Link } from 'react-router-dom'

const Cocktail = ({id , name , image , info , glass}) => {
  return (
    <article>
        <div>
          <img className="drink-img" src={image} alt="logo" />
        </div>
        <div className="drink-info">
          <div className="name">{name}</div>
          <div className="glass">{glass}</div>
          <div className="info">{info}</div>
          <div className="detail-btn"><Link to={`/cocktail/${id}`}>DETAILS</Link></div>
        </div>
        
    </article>
    
  )
}

export default Cocktail
