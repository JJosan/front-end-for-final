import React from 'react'
import './ShoppingPage.css'
import {List, Input, Button} from 'reactstrap'

let tripID = null
const apiVersion="v1"

function ShoppingPage() {
  
  getTripID(showList);

  return (
    <div className='ShoppingPage'>
        
        <Input name="itemNameInput" id="itemNameInput" placeholder="Input item name" />
        <Input name="itemQuantityInput" id="itemQuantityInput" placeholder="Input item quantity" />
        <Button onClick={addItem}>add item</Button>
        <Button onClick={showList}>Refresh List</Button>
        <div id="tripID"></div>
        <List type="inline" id="shoppingList"></List>
    </div>
  )

async function addItem() {
  let item = document.getElementById("itemNameInput").value;
  let quantity = document.getElementById("itemQuantityInput").value;
  console.log(tripID)
  try {
       const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        await fetch(`api/${apiVersion}/items/add?item=${item}&quantity=${quantity}&tripID=${tripID}`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
        showList();
  } catch(error) {
      throw(error)
  }
}


async function showList(){
  try {
    const deleteHandler = async (id) => {
      // currently, endpoint only prints out selected item
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      await fetch(`api/${apiVersion}/items/delete?itemID=${id}`, requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));
      showList();
    }
    console.log(tripID)
    await fetch(`api/${apiVersion}/items/receipt?tripID=${tripID}`)
    .then(response => response.json())
    .then(receipt => {
      var shoppingList = document.getElementById("shoppingList")
      shoppingList.innerHTML = ''
      for (let i = 0; i < receipt.length; i++) {
        var listItem = document.createElement("ListInlineItem")
        listItem.innerHTML = `${receipt[i].NameOfItem}:${receipt[i].Quantity} <br>`
        var buttonItem = document.createElement("Button")
        // buttonItem.className = "btn"
        buttonItem.innerHTML = "delete"
        buttonItem.id = receipt[i]._id;
        buttonItem.addEventListener("click", function(){
          deleteHandler(receipt[i]._id)
        });
        shoppingList.appendChild(buttonItem);
        shoppingList.appendChild(listItem);
      } 
    })   
  }catch(error) {
    throw(error)
  }
}

async function getTripID(callback){
  try{
    await fetch(`api/${apiVersion}/trips/tripID`)
    .then(response => response.json())
    .then(data => {
      tripID = data.tripID
      document.getElementById("tripID").innerHTML = data.tripID
    })
    callback();
  }catch(error){
    throw(error)
  }
}

}
export default ShoppingPage;