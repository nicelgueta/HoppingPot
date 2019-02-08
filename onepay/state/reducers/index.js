import { combineReducers } from "redux";

import user from "./userReducer";
import modal from "./modalReducer";

export default combineReducers({
  user,
  modal
})
