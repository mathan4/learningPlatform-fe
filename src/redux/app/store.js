import { configureStore } from "@reduxjs/toolkit";
import registerReducer from '../features/registerSlice';
import loginReducer from '../features/loginSlice';
import userSlice from '../features/userSlice'

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        user:userSlice,
    },
})

export default store;