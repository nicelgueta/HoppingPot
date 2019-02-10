
export default function reducer(state={
    calcApiResponse: null,
    calcApiCalling: false,
    calcApiError:false
  }, action) {

    switch (action.type) {
      case "CALL_CALC_API": {
        return {...state, calcApiCalling: true}
      }
      case 'SET_CALC_RESPONSE':{
        return {...state,calcApiResponse: action.payload,calcApiCalling:false}
      }
      case 'SET_CALC_ERROR':{
        return {...state,calcApiError: action.payload}
      }
    }

    return state
}
