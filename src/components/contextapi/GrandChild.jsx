

import React, { useContext } from 'react'
import { MyContext } from '../../pages/ContextApi';
const GrandChild = () => {
  const { contextstate, contextdispatch } = useContext(MyContext)

  return (
    <div>this is grand child component
      <h1>Name:{contextstate.name}</h1>
      <button onClick={() => contextdispatch({ type: "CHANGE_NAME", payload: "farhan" })}>change name</button>
    </div>
  )
}

export default GrandChild