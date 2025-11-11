'use client'
import {Provider} from "react-redux";
import {store} from "../redux/store";
import ClientInit from "./clientInit";

export default function ReduxProvider({ children }) {
    return <Provider store={store}><ClientInit/>{children}</Provider>
}