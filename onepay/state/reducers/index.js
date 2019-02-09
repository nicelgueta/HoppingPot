import { combineReducers } from "redux";

import user from "./userReducer";
import modal from "./modalReducer";
import tabs from "./tabReducer";

export default combineReducers({
  user,
  modal,
  tabs
})
