import { createContext, useReducer } from "react";
import { DataReducer, FormReducer } from "../reducers/DataReducer";
export const FormContext = createContext();
export const DataContext = createContext();
export const FormContextProvider = ({ children }) => {
  const [formState, dispatch] = useReducer(FormReducer, {
    showForm: "",
  });

  const updateForm = (form) => {
    dispatch({ type: "SET_FORM", payload: form });
  };

  const FormContextValue = {
    updateForm,
    formState,
  };

  return (
    <FormContext.Provider value={FormContextValue}>
      {children}
    </FormContext.Provider>
  );
};
export const DataContextProvider = ({ children }) => {
  const [dataState, dispatch] = useReducer(DataReducer, {
    audioChoose: null,
    listAudio: [],
    indexInList:0
  });

  const updateAudio = (audioChoose, listAudio, indexInList) => {
    if (audioChoose) {
      dispatch({
        type: "SET_AUDIO",
        payload: {
          audioChoose
        },
      });
    }
    if (!audioChoose) {
      dispatch({
        type: "SET_LIST_AUDIO",
        payload: {
          audioChoose,
          listAudio,
          indexInList,
        },
      });
    }
  };
  const DataContextValue = {
    updateAudio,
    dataState,
  };
  return (
    <DataContext.Provider value={DataContextValue}>
      {children}
    </DataContext.Provider>
  );
};
