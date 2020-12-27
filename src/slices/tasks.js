import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    data: {
        lanes: [
            {
                id: 'toDo',
                title: 'Por hacer',
                label: '0',
                cards: []
            },
            {
                id: 'completed',
                title: 'Completadas',
                label: '0/0',
                cards: []
            }
        ]
    }
}

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addItem: (state, payload) => {
            state.toDoList.push(payload);
        },
        removeItem: (state,payload) => {
            state.toDoList.push(payload);
        }
    }
});
export default slice.reducer

export const { addItem, removeItem } = slice.actions;

  
