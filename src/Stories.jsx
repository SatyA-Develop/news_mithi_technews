import React from 'react'
import { useGlobalContext } from './Context';

const Stories = () => {
  const { hits, isLoading, handleDelete } = useGlobalContext();
  

  if(isLoading){
    return (
      <>
      <h1>Loading....</h1>
      </>
    )
    
  }
  
  return (
    <>
    <div className="stories-div">
    {hits.map(( hit )=>{
      const { title, author, objectID, url, num_comments } = hit;

      return (
      <div className="card" key ={objectID}>
      <h2>{title}</h2>
      <p>
        By <span>{author}</span> | <span>{num_comments}</span> comments
      </p>
       <div className="card-button">
        <a href={url} target="_blank" rel="noreferrer">
          Read More
        </a>
        <a href="#" onClick={()=> handleDelete(objectID)}>Remove</a>
       </div>
      </div>
      )
    })}
    </div>
    </>
  )
}

export default Stories
