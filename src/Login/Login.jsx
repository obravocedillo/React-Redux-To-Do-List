import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { Card } from 'primereact/card';
import './Login.css';
import { login, register } from '../slices/user';
import { Toast } from 'primereact/toast';

function Login(){
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    //Register information
    const [openedLogin, setOpenedLogin] = useState(true);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userRepeatPassword, setUserRepeatPassword] = useState("");
    //Login information
    const [userEmailLogin, setUserEmailLogin] = useState("");
    const [userPasswordLogin, setUserPasswordLogin] = useState("");

    const myToast = useRef(null);

    const showToast = (severityValue, summaryValue, detailValue) => {   
        myToast.current.show({severity: severityValue, summary: summaryValue, detail: detailValue});   
    }

    const changeLoginView = ()=>{
        setOpenedLogin(!openedLogin)
    }

    const loginButton = (e)=>{
        e.preventDefault()
        if(validateLogin()){
            dispatch(login(userEmailLogin,userPasswordLogin)).then((result)=>{
                showToast('success','Success Message','The task was executed successfully.')
                console.log(result)
            },(reject)=>{
                showToast('error','Error Message','Validation failed')
                console.log(reject)
            })
        }else{
            showToast('error','Error Message','Validation failed')
        }
    }

    const registerButton = (e) =>{
        e.preventDefault() 
        if(validateRegister()){
            dispatch(register(userName,userEmail,userPassword)).then((result)=>{
                showToast('success','Success Message','The task was executed successfully.')
                console.log(result)
            },(reject)=>{
                showToast('error','Error Message','Validation failed')
                console.log(reject)
            })
        }else{
            showToast('error','Error Message','Validation failed')
        }
       
    }
    

    const validateLogin = (e) =>{
        let flag = true;
        if(userEmailLogin.length <= 0 || !isEmail(userEmail)){
            flag = false
        }
        if(userPasswordLogin.length <= 0){
            flag = false
        }
        return flag
    } 

    const validateRegister = (e) =>{
        let flag = true;
        if(userEmail.length <= 0 || !isEmail(userEmail)){
            flag = false
        }
        if(userName.length <= 0){
            flag = false
        }
        if(userPassword !== userRepeatPassword){
            flag = false
        }
        return flag
    } 

    const isEmail = (val) => {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regEmail.test(val)){
            return false
        }else{
            return true
        }
    }

    if(openedLogin === true){
        return (
            <div className="container">
                <Toast ref={myToast}/> 
                <section className="section">
                    <Card className="login-card" title="Login">
                        <div className="p-grid p-fluid p-justify-center">
                            <div className="p-col-11 p-md-10">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText placeholder="Email" value={userEmailLogin} onChange={e => setUserEmailLogin(e.target.value)}/>
                                </div>
                                <div className="p-inputgroup second-input">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText placeholder="Password" value={userPasswordLogin} onChange={e => setUserPasswordLogin(e.target.value)}/>
                                </div>
    
                                <div className="second-input">
                                    <Button label="Login" onClick={event => loginButton(event)}/>
                                </div>
    
                                <div className="second-input hint">
                                    <span onClick={changeLoginView}>You do have an account? Register here</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>
            </div>
        )
    }else{
        return (
            <div className="container">
                <Toast ref={myToast}/> 
                <section className="section">
                    <Card className="login-card" title="Register">
                        <div className="p-grid p-fluid p-justify-center">
                            <div className="p-col-11 p-md-10">
                            <div className="p-inputgroup second-input">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText placeholder="Name" value={userName} onChange={e => setUserName(e.target.value)}/>
                                </div>
                                <div className="p-inputgroup second-input">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText placeholder="Email" value={userEmail} onChange={e => setUserEmail(e.target.value)}/>
                                </div>
                                <div className="p-inputgroup second-input">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText placeholder="Password" value={userPassword} onChange={e => setUserPassword(e.target.value)}/>
                                </div>
                                <div className="p-inputgroup second-input">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText placeholder="Repeat password" value={userRepeatPassword} onChange={e => setUserRepeatPassword(e.target.value)}/>
                                </div>
    
                                <div className="second-input">
                                    <Button label="Register" onClick={event => registerButton(event)}/>
                                </div>
    
                                <div className="second-input hint">
                                    <span onClick={changeLoginView}>You already have an account? Login here</span>
                                </div>

                            </div>
                        </div>
                    </Card>
                </section>
            </div>
        )
    }
}

export default Login