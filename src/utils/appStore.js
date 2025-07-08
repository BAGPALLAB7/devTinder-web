import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./userSlice";
import feedReducer from "./feedSlice";
import connections from "./connectionsSlice";
import requests from "./requestsSlice";

const appStore = configureStore({
    reducer: {
        user : userReducer,
        feed: feedReducer,
        connections: connections,
        requests: requests,
    }
});

export default appStore;