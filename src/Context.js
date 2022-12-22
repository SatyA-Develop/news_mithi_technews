// import { type } from '@testing-library/user-event/dist/type';
import React, { useContext, useReducer, useEffect } from 'react'

import reducer from './reducer';

let API = 'https://hn.algolia.com/api/v1/search?';

const initialState={
    isLaoding : true,
    query: "HTML",
    nbPages: 0,
    page: 0,
    hits:[],
};


const AppContext = React.createContext();



const AppProvider =({ children })=>{

    const [state, dispatch] = useReducer(reducer, initialState )

  const fetchApiData = async (url)=>{

    dispatch( {type : "SET_LOADING"})
     try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data)
      dispatch(
       {
        type: "GET_STORIES",
        payload: {
            hits: data.hits,
            nbPages: data.nbPages,
        }
       }
        
      )
     } catch (error) {
      console.log(error);
     }
     
  }
  
  
  const getPrevPage= ()=>{
    dispatch({ type: "PREV_PAGE"})
  }
  const getNextPage= ()=>{
    dispatch({ type: "NEXT_PAGE"})
  }

  const searchPost = (searchQuery) =>{
    dispatch({ type: "POST_SEARCH" , payload: searchQuery} )
  }

  const handleDelete=(Post_id)=>{
    dispatch({type: "DELETE_POST" , payload:Post_id })
  }

  useEffect(() => {
    fetchApiData(`${API}query=${state.query}&page=${state.page}`);
  }, [state.query,state.page])


    return (
        <AppContext.Provider value={{ ...state, handleDelete, searchPost, getPrevPage, getNextPage }}>
        {children}
        </AppContext.Provider>
    ) 
    
};

const useGlobalContext=()=>{
    return useContext(AppContext)
};


export { AppContext, AppProvider, useGlobalContext };