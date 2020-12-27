import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    user: null,
    alreadyLoggedIn: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.user = true;
        },
        logoutSuccess: (state) => {
            state.user = false;
        }
    }
});
export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer

export const login = (email, password) => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            fetch("http://localhost/dashboard/").then((result)=>{
                console.log(result)
                dispatch(loginSuccess({email}));
                resolve("Success")
            })
          } catch (e) {
            reject(e.message);
        }
    })
}

export const register = (name, email, password) => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            fetch("http://localhost/dashboard/").then((result)=>{
                console.log(result)
                dispatch(loginSuccess({email}));
                resolve("Success")
            })
          } catch (e) {
            reject(e.message);
        }
    })
}

export const logout = () => async dispatch => {
    return new Promise((resolve, reject) => {
        try {
            dispatch(logoutSuccess())
            resolve("Success")
        } catch (e) {
            reject(e.message);
        }
    })
}
