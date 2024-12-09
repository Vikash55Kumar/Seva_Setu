import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import { adminReducer, reportReducer } from "./reducer/adminReducer";

const store = configureStore ({
    reducer : {
        user:userReducer,
        admin:adminReducer,
        report:reportReducer
    }
})

export default store;

