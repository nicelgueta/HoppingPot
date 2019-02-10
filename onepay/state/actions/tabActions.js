
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
