import {combineReducers} from "redux";
import seminarsSlice from "./seminarsSlice";

export const rootReducer = combineReducers({
    seminarsReducer: seminarsSlice
})