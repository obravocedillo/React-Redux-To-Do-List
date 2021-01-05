import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'primereact/button';
import Board from 'react-trello'
import { Toast } from 'primereact/toast';
import { newItem } from '../slices/tasks'

function DoList(){

    const dispatch = useDispatch()
    const { data } = useSelector((state) => state.tasks)

    const myToast = useRef(null);

    const showToast = (severityValue, summaryValue, detailValue) => {   
        myToast.current.show({severity: severityValue, summary: summaryValue, detail: detailValue});   
    }
    
    const handleCardAdd = (card, laneId) => {
        dispatch(newItem(card,laneId)).then((result)=>{
            showToast('success','Success Message','The task was executed successfully.')
            console.log(result)
        },(reject)=>{
            showToast('error','Error Message','Error adding task')
            console.log(reject)
        })
    }

    return (
        <div className="container">
            <Toast ref={myToast}/> 
            <section className="section">
                <div className="container">
                    <div className="card">
                        <Board data={data} editable onCardAdd={handleCardAdd}/>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default DoList