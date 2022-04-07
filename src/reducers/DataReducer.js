export const DataReducer = (state, action) => {
  const {
    type,
    payload: { keyAudio, listKey,indexKey }
  } = action;

  switch (type) {
    case "SET_AUDIO":
      return {
        ...state,
        keyAudio,
      }
    case "SET_LIST_AUDIO":
      return{
        ...state,
        keyAudio:listKey[indexKey],
        listKey,
        indexKey,
      }
    default:
      return state;
  }
};
export const FormReducer = (state,action)=>{
  const {
    type,payload:form
  }=action;
  switch(type){
    case "SET_FORM":
      return{
        ...state,
        showForm :form
      }
    default:
      return state
  }
}
