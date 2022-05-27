import React from 'react'
import './ShoppingPage.css'
import {List, Input, Button } from 'reactstrap'

let tripID = null
const apiVersion="v1"

function ShoppingPage() {
  getTripID();
  return (
    <div className='ShoppingPage'>
        {/* <List type="inline" id="shoppingList" onLoad={showList}></List> */}
        <Input name="itemNameInput" id="itemNameInput" placeholder="Input item name" />
        <Input name="itemQuantityInput" id="itemQuantityInput" placeholder="Input item quantity" />
        <Button onClick={addItem}>add item</Button>
        <Button onClick={getTripID}>get tripID</Button>
        <div id="tripID"></div>
    </div>
  )
}

async function addItem() {
  let item = document.getElementById("itemName").value;
  let quantity = document.getElementById("itemQuantity").value;
  console.log(tripID)
  try {
       const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`api/${apiVersion}/items/add?item=${item}&quantity=${quantity}&tripID=${tripID}`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
      // await fetchJSON(`api/${apiVersion}/items/add?item=${item}&quantity=${quantity}&tripID=${tripID}`, {
      //     method: "POST"
      // })
  } catch(error) {
      throw(error)
  }
}

// async function showList(){
//   try {
//     let receipt = await fetch(`api/${apiVersion}/items/receipt?tripID=${tripID}`)
//     var shoppingList = document.getElementById("shoppingList")
//     for (let i = 0; i < receipt.length; i++) {
//         var listItem = document.createElement(ListInlineItem)
//         listItem.innerHTML = `${receipt[i].NameOfItem}:${receipt[i].Quantity}`
//         shoppingList.appendChild(listItem);
//     }
//   }catch(error) {
//     throw(error)
//   }
// }

async function getTripID(){
  try{
    fetch(`api/${apiVersion}/trips/tripID`)
    .then(response => response.json())
    .then(data => {
      tripID = data.tripID
      document.getElementById("tripID").innerHTML = data.tripID
    })
    //
  }catch(error){
    throw(error)
  }
}


export default ShoppingPage