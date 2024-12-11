import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export const dataProvider=createContext()


const Data = ({children}) => {
  const [createList, setcreateList] = useState([]);


  return (
   <dataProvider.Provider value={{createList,setcreateList}} >
{children}
   </dataProvider.Provider>
  )
}

export default Data
