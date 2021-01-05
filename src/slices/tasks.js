import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    data: {
        lanes: [
            {
                id: 'toDo',
                title: 'To do',
                label: '0',
                cards: []
            },
            {
                id: 'doing',
                title: 'Doing',
                label: '0/0',
                cards: []
            },
            {
                id: 'completed',
                title: 'Completed',
                label: '0/0',
                cards: []
            },
        ]
    }
}

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addItem: (state, payload) => {
            if(payload.board === 'toDo'){
                state.lanes[0].cards.push(payload);
            }else if(payload.board === 'doing'){
                state.lanes[1].cards.push(payload);
            }else if(payload.board === 'completed'){
                state.lanes[2].cards.push(payload);
            }
            
        },
        updateItem: (state,payload) => {
            if(payload.board === 'toDo'){
                for (let index = 0; index < state.lanes[0].cards.length; index++) {
                    if(state.lanes[0].cards[index].id === payload.id){
                        state.lanes[0].cards[index].id = payload 
                    }
                }
            }else if(payload.board === 'doing'){
                for (let index = 0; index < state.lanes[1].cards.length; index++) {
                    if(state.lanes[1].cards[index].id === payload.id){
                        state.lanes[1].cards[index].id = payload 
                    }
                }
            } else if(payload.board === 'completed'){
                for (let index = 0; index < state.lanes[2].cards.length; index++) {
                    if(state.lanes[2].cards[index].id === payload.id){
                        state.lanes[2].cards[index].id = payload 
                    }
                }
            }    
        }
    }
});

export const { addItem, removeItem } = slice.actions;
export default slice.reducer

export const newItem = (item,laneId) => dispatch => {
    console.log(item)
    return new Promise((resolve, reject) => {
        try {
            let formData = new FormData();
            item.laneId = laneId;
            formData.append('item', JSON.stringify(item));
            fetch("http://localhost/php/add-item.php",{method:'post',body:formData}).then((result)=>{
                console.log(result)
                result.json().then(data=>{
                    console.log(data)
                    if(data.success === true){
                        let tempData = data.data
                        resolve("Success")
                    }else{
                        reject("Error")
                    }
                })
            })
          } catch (e) {
            reject(e.message);
        }
    })
}
  

export const updateItemDataBase = (item) => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            let formData = new FormData();
            formData.append('item', item);
            fetch("http://localhost/php/update-item.php",{method:'post',body:formData}).then((result)=>{
                console.log(result)
                result.json().then(data=>{
                    console.log(data)
                    if(data.success === true){
                        let tempData = data.data
                        dispatch(removeItem(item));
                        resolve("Success")
                    }else{
                        reject("Error")
                    }
                })
            })
          } catch (e) {
            reject(e.message);
        }
    })
}