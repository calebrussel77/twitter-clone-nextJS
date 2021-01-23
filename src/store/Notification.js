import { useReducer, useContext, createContext } from "react";
import { v4 } from "uuid";
import Notification from "../components/UI/Notification/Notification.jsx";

const NotificationStateContext = createContext();
const NotificationDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [...state, { ...action.payload }];
    case "REMOVE_NOTIFICATION":
      return state?.filter((el) => el.id !== action.id);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <NotificationDispatchContext.Provider value={dispatch}>
      <NotificationStateContext.Provider value={state}>
        <>
          {state?.map((note) => {
            return <Notification dispatch={dispatch} key={note.id} {...note} />;
          })}
        </>
        {children}
      </NotificationStateContext.Provider>
    </NotificationDispatchContext.Provider>
  );
};

export const useNotification = () => {
  const dispatch = useContext(NotificationDispatchContext);

  return (props) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        ...props,
      },
    });
  };
};

// export const useDispatchCount = () => useContext(CounterDispatchContext);
