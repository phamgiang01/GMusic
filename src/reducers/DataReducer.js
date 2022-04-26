export const DataReducer = (state, action) => {
  const {
    type,
    payload: { audioChoose, listAudio,indexInList }
  } = action;

  switch (type) {
    case "SET_AUDIO":
      return {
        ...state,
        audioChoose,
      }
    case "SET_LIST_AUDIO":
      return{
        ...state,
        audioChoose:listAudio[indexInList],
        listAudio,
        indexInList,
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
