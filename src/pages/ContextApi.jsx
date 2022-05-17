import React, { useReducer, createContext } from "react";
import Child from "../components/contextapi/Child";
import Sibling from "../components/contextapi/Sibling";
export const MyContext = createContext({ theme: "dark" })
MyContext.displayName = 'TestContext';
const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return { ...state, name: action.payload };

    default:
      throw new Error();
  }
}
const ContextApi = () => {
  const initial_state = {
    name: "arslan"
  }
  const [state, dispatch] = useReducer(reducer, initial_state);
  return (
    <div>
      <MyContext.Provider value={{ contextstate: state, contextdispatch: dispatch }}>
        <div>
          <Child />
        </div>
        <div>
          <Sibling />
        </div>
      </MyContext.Provider>
    </div>
  )
}

export default ContextApi