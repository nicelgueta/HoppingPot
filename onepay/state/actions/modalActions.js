
export function clearModal(){
  return {
    type: 'CLEAR_MODAL',
    payload: false
  }
}
export function enterModal(){
  return {
    type: 'ENTER_MODAL',
    payload: true
  }
}

export function addModalBody(body){
  return {
    type: 'ADD_MODAL_BODY',
    payload: body
  }
}
