import { createSlice } from "@reduxjs/toolkit";

const iState = {
    todos:[]
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: iState,
    reducers:{
        add(state, action){
            state.todos.unshift({id:Math.round(Math.random()*10000), text: action.payload})
        },
        remove(state, action){
            state.todos = state.todos.filter(todo=> todo.id !== action.payload)
        },
        replace(state, action){
            state.todos = action.payload
        },
    }
})


export const todoActions = todoSlice.actions

export default todoSlice.reducer