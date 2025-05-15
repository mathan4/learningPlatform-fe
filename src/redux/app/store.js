import { configureStore } from "@reduxjs/toolkit";
import registerReducer from '../features/registerSlice';
import loginReducer from '../features/loginSlice';

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
    },
})

export default store;