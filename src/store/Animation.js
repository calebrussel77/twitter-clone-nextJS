import { useReducer, useContext, createContext } from "react";

const AnimationStateContext = createContext();
const AnimationDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ANIMATION":
      return true;
    case "HIDE_ANIMATION":
      return false;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const AnimationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, false);
  return (
    <AnimationDispatchContext.Provider value={dispatch}>
      <AnimationStateContext.Provider value={state}>
        {children}
      </AnimationStateContext.Provider>
    </AnimationDispatchContext.Provider>
  );
};

export const useAnimation = () => useContext(AnimationStateContext);
export const useDispatchAnimation = () => useContext(AnimationDispatchContext);
