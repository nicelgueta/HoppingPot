
export default function reducer(state={
    modalBody: null,
    isVisible:false,
  }, action) {

    switch (action.type) {
      case "CLEAR_MODAL": {
        return {...state, isVisible: false, modalBody: null}
      }
      case 'ENTER_MODAL':{
        return {...state,isVisible: true}
      }
      case 'ADD_MODAL_BODY':{
        return {...state,modalBody: action.payload}
      }
    }

    return state
}
