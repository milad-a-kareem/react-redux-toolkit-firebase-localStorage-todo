import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme-slice";
import todoSlice from './todo-slice'


const store = configureStore({
    reducer: { todo: todoSlice, theme: themeSlice}
})
export default store