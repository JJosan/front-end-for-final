import React from 'react'
import './MainPage.css'
import {Button, Input} from 'reactstrap'
import { Link } from 'react-router-dom'

const apiVersion = "v1"

function MainPage() {

    async function createNewTrip(){
        await fetch(`api/${apiVersion}/trips/add`,{
            method: "POST"
        })
        .then(response => {
            response.json().then((data) => {
                console.log(JSON.stringify(data.ID))
                document.getElementById("joinID").innerText=`Join ID: ${data.ID}`;
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    
    async function joinTrip(){
        let tripID = document.getElementById("tripIDInput").value;
        console.log(tripID)
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tripID: tripID })
            };
            await fetch(`api/${apiVersion}/trips/addUser`, requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
        } catch(error) {
            throw(error)
        }
    }

    return (
        <div className='MainPage_container'>
            <div className='MainPage'>
                <Link to='shoppingpage'><Button onClick={createNewTrip}>Host New Group</Button></Link>
                <Input name="tripIDInput" id="tripIDInput" placeholder="Input TripID" />
                <Link to='/shoppingpage'><Button onClick={joinTrip}>Join Group</Button></Link>
                <div id="joinID"></div>
            </div>
            {/* server blows up if the same person makes more than 1 trip */}
            
        </div>
  )
}



export default MainPage