import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'primereact/button';
import Board from 'react-trello'

function openmodal(user, data){
    console.log("test")
    console.log(user)
    console.log(data)
}

function DoList(){
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const { data } = useSelector((state) => state.tasks)
    return (
        <div className="container">
            <section className="section">
                <div className="container">
                    <div className="card">
                        <Board data={data}/>
                    </div>
                    <section className="bottom">
                        <Button label="Save" onClick={() => openmodal(user,data)}/>
                    </section>
                </div>
            </section>

        </div>
    )
}

export default DoList