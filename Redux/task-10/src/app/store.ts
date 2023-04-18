import { configureStore } from "@reduxjs/toolkit";
import incrementCounterReducer from "../features/IncrementCounterSlice.js";
import decrementCounterReducer from "../features/DecrementCounterSlice.js";

export default configureStore({
    reducer: {
        increment: incrementCounterReducer, //use selector works on the name of this property
        decrement: decrementCounterReducer //use selector works on the name of this
    }
})