import React, {useState} from 'react'
import './MainPage.css'
import {Button, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { Link } from 'react-router-dom'

const apiVersion = "v1"



function MainPage() {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

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
                <div className="TitlePage">DivvyUp</div>
                <Link to='shoppingpage'><Button id='MainPage_CreateTrip' onClick={createNewTrip}>Host New Group</Button></Link>
                <div>
                <Button id='MainPage_JoinTrip' onClick={toggleModal}>
                    Join Group
                </Button>
                <Modal isOpen={modal}>
                    {/* <ModalHeader> Modal title </ModalHeader> */}
                    <ModalBody>  
                        <Input name="tripIDInput" id="tripIDInput" placeholder="Input TripID" />
                    </ModalBody>
                    <ModalFooter>
                        <Link to='shoppingpage'>
                            <Button color="primary" onClick={joinTrip}>
                                Join Group
                            </Button>
                        </Link>
                        {' '}
                        <Button onClick={toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
            </div>
                
            
            {/* server blows up if the same person makes more than 1 trip */}
            
        </div>
        
  )
}



export default MainPage