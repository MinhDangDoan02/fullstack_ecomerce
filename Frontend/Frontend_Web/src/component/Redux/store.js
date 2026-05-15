// import  { createStore } from 'redux'
// import rootReducer from './Reducer'

// const store = createStore(rootReducer)

// export default store

import {configureStore} from "@reduxjs/toolkit"
import CounterSlice from "./CounterSlice"


export const store = configureStore({
    reducer: {
        cartCount: CounterSlice
    }
})