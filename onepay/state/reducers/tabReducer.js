
const DEFAULT_TAB =
  {
   tabId:0,
   tabName:"string",
   peopleInTab:[
     "string"
   ],
   tabData:[
     {
       name:"string",
       paymentId:0,
       description:"string",
       amount:0.0,
       currency:"string",
       date:"string",
       dateInt:0
     }
   ]
  }
export default function reducer(state={
    openTab: [],
    formName:null,
    formPaymentAmount:0,
    formPaymentDescription:'',
    formPaymentName:'',
    newTabName:null,
    myTabs:[],
    tabSelected:DEFAULT_TAB
  }, action) {

    switch (action.type) {
      case "ADD_TO_OPEN_TAB": {
        return {...state, openTab: state.openTab.concat(action.payload), formName:null}
      }
      case 'REMOVE_FROM_OPEN_TAB':{
        return {...state,openTab: state.openTab.filter(element => element !== action.payload)}
      }
      case 'CLEAR_OPEN_TAB':{
        return {...state,openTab: action.payload, newTabName:null,formName:null,formAmount:0}
      }
      case 'NEW_NAME_TO_TAB':{
        return {...state,formName: action.payload}
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
      case 'EDIT_TAB':{
        let tabs = state.myTabs.filter(element => element.tabId !== action.payload.tabId) //remove the current tab ID from array
        tabs.push(action.payload.tabObj) //add new version of the tab to array
        return {...state,myTabs: tabs}
      }
      case 'SELECT_TAB':{
        let tabSelected = state.myTabs.filter(obj=>{return obj.tabId===action.payload})[0]
        return {...state,tabSelected: tabSelected}
      }
      case 'ADD_PAYMENT_NAME':{
        return {...state,formPaymentName: action.payload}
      }
      case 'ADD_PAYMENT_AMOUNT':{
        return {...state,formPaymentAmount: action.payload}
      }
      case 'ADD_PAYMENT_DESCRIPTION':{
        return {...state,formPaymentDescription: action.payload}
      }
      case 'CLEAR_PAYMENT':{
        return {...state,formPaymentDescription: '', formPaymentAmount:0,formPaymentName:null}
      }
    }

    return state
}
