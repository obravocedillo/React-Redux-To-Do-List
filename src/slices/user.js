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
            let formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            fetch("http://localhost/php/login.php",{method:'post',body:formData}).then((result)=>{
                result.json().then(data=>{
                    console.log(data)
                    if(data.success === true){
                        dispatch(loginSuccess({email}));
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

export const register = (nameRegister, emailRegister, passwordRegister) => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            let formData = new FormData();
            formData.append('name', nameRegister);
            formData.append('email', emailRegister);
            formData.append('password', passwordRegister);
            fetch("http://localhost/php/register.php",{method:'post',body:formData}).then((result)=>{
                console.log(result)
                result.json().then(data=>{
                    console.log(data)
                    if(data.success === true){
                        dispatch(loginSuccess({emailRegister}));
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
