
export default function reducer(state={
    user: {
      id: 123,
      name: 'Nick',
      age: 27,
    },
    fetching: false,
    fetched: false,
    error: null,
    updateRequired:false,
  }, action) {

    switch (action.type) {
      case "FETCH_USER": {
        return {...state, fetching: true}
      }
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
      case "SET_USER_NAME": {
        return {
          ...state,
          user: {...state.user, name: action.payload},
        }
      }
      case "SET_USER_AGE": {
        return {
          ...state,
          user: {...state.user, age: action.payload},
        }
      }
      case "SET_UPDATE_REQUIRED": {
        return {
          ...state,
          user: {...state.user, updateRequired: action.payload},
        }
      }
    }

    return state
}
