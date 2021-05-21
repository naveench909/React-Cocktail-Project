import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const{setSearchTerm} = useGlobalContext();
  const searchValue = React.useRef('');

  React.useEffect(()=>{
    searchValue.current.focus();
  },[]);
  
  const searchCocktail = ()=>{
    setSearchTerm(searchValue.current.value);
  }

  if(searchValue.current.value === ""){
    setSearchTerm('a');
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
  }
  return (
    <section className="section-search" >
      <form className="searchForm-bar" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Search Your Favorite Cocktail</label>
          <input type="text" id="name" ref={searchValue}
          onChange={searchCocktail} />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
