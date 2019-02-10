
export function callCalcApi(){
  return {
    type: 'CALL_CALC_API'
  }
}
export function setCalcResponse(response){
  return {
    type: 'SET_CALC_RESPONSE',
    payload: response
  }
}

export function setCalcError(body){
  return {
    type: 'SET_CALC_ERROR',
    payload: body
  }
}
