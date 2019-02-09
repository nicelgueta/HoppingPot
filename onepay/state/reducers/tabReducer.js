
export default function reducer(state={
    openTab: [],
    formName:null,
    formAmount:null,
    newTabName:null,
    myTabs:[]
  }, action) {

    switch (action.type) {
      case "ADD_TO_OPEN_TAB": {
        return {...state, openTab: state.openTab.concat(action.payload)}
      }
      case 'REMOVE_FROM_OPEN_TAB':{
        return {...state,openTab: state.openTab.filter(element => element !== action.payload)}
      }
      case 'CLEAR_OPEN_TAB':{
        return {...state,openTab: action.payload, newTabName:null}
      }
      case 'NEW_NAME_TO_TAB':{
        return {...state,formName: action.payload}
      }
      case 'NEW_AMOUNT_TO_TAB':{
        return {...state,formAmount: action.payload}
      }
      case 'SAVE_TAB':{
        return {...state,myTabs: state.myTabs.concat(action.payload)}
      }
      case 'DELETE_TAB':{
        return {...state,myTabs: state.myTabs.filter(element => element.tabId !== action.payload)}
      }
      case 'NAME_TAB':{
        return {...state,newTabName: action.payload}
      }
    }

    return state
}
