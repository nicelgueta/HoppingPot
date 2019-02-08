
export default function reducer(state={
    modalBody: null,
    isVisible:false,
  }, action) {

    switch (action.type) {
      case "CLEAR_MODAL": {
        return {...state, isVisible: false}
      }
      case 'ENTER_MODAL':{
        return {...state,isVisible: true}
      }
    }

    return state
}
