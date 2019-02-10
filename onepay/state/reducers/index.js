import { combineReducers } from "redux";

import user from "./userReducer";
import modal from "./modalReducer";
import tabs from "./tabReducer";
import calcs from './calcReducer';

export default combineReducers({
  user,
  modal,
  tabs,
  calcs
})
