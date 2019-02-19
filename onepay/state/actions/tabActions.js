
export function addToOpenTab(item){
  return {
    type: 'ADD_TO_OPEN_TAB',
    payload: item
  }
}
export function removeFromOpenTab(item){
  return {
    type: 'REMOVE_FROM_OPEN_TAB',
    payload: item
  }
}
export function newNameToTab(item){
  return {
    type: 'NEW_NAME_TO_TAB',
    payload: item
  }
}
export function clearOpenTab(){
  return {
    type: 'CLEAR_OPEN_TAB',
    payload: []
  }
}
export function deleteTab(id){
  return {
    type: 'DELETE_TAB',
    payload: id
  }
}
export function saveTab(tabObj){
  return {
    type: 'SAVE_TAB',
    payload: tabObj
  }
}
export function nameTab(tabName){
  return {
    type: 'NAME_TAB',
    payload: tabName
  }
}
export function selectTab(tabId){
  return {
    type: 'SELECT_TAB',
    payload: tabId
  }
}
export function editTab(tabId,newTabObj){
  return {
    type: 'EDIT_TAB',
    payload: {tabId: tabId,tabObj: newTabObj}
  }
}
export function addPaymentName(name){
  return {
    type: 'ADD_PAYMENT_NAME',
    payload: name
  }
}
export function addPaymentAmount(amount){
  return {
    type: 'ADD_PAYMENT_AMOUNT',
    payload: amount
  }
}
export function addPaymentDescription(desc){
  return {
    type: 'ADD_PAYMENT_DESCRIPTION',
    payload: desc
  }
}
export function clearPayment(){
  return {
    type: 'CLEAR_PAYMENT'
  }
}
export function setFormError(status){
  return {
    type: 'SET_FORM_ERROR',
    payload: status
  }
}
