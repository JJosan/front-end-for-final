import React from 'react'
import './ShoppingPage.css'
import {List, Input, Button} from 'reactstrap'
import { useNavigate } from 'react-router-dom'

let tripID = null
const apiVersion="v1"

function ShoppingPage() {
  getTripID(showList);
  let navigate = useNavigate();
  return (
    <div className='ShoppingPage'>
        
        <Input name="itemNameInput" id="itemNameInput" placeholder="Input item name" />
        <Input name="itemQuantityInput" id="itemQuantityInput" placeholder="Input item quantity" />
        <Button onClick={addItem}>add item</Button>
        <Button onClick={showList}>Refresh List</Button>
        <div id="tripID"></div>
        <List type="inline" id="shoppingList"></List>

        <Button onClick={showSubtotal}>Checkout</Button>
        <div id="subtotals"></div>
        <Button onClick={deleteUser}>Quit</Button>
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
    const uploadPriceHandler = async (id, price) => {
      // currently, endpoint only prints out selected item
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      };
      await fetch(`api/${apiVersion}/items/addPrice?itemID=${id}&tripID=${tripID}&price=${price}`, requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));
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

        var deleteButtonItem = document.createElement("Button")
        deleteButtonItem.innerHTML = "delete"
        deleteButtonItem.id = receipt[i]._id;
        deleteButtonItem.addEventListener("click", function(){
          deleteHandler(receipt[i]._id)
        });

        var priceItem = document.createElement("Input")
        priceItem.setAttribute("type", "text")
        priceItem.id = "Input" + receipt[i]._id;

        var uploadPriceButton = document.createElement("Button")
        uploadPriceButton.innerHTML = "Upload"
        uploadPriceButton.id = "Button" + receipt[i]._id;
        uploadPriceButton.addEventListener("click", function(){
            var priceInput = document.getElementById(`Input${receipt[i]._id}`).value
            console.log(document.getElementById(`Input${receipt[i]._id}`))
            uploadPriceHandler(receipt[i]._id, priceInput)
        })

        shoppingList.appendChild(deleteButtonItem);
        shoppingList.appendChild(priceItem);
        shoppingList.appendChild(uploadPriceButton);
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

async function showSubtotal() {
  try {
    document.getElementById("subtotals").innerText = ""
    await fetch(`api/${apiVersion}/trips/subtotal?tripID=${tripID}`)
    .then(response => response.json()) 
    .then(datas => {
      datas.forEach(data => {
        document.getElementById("subtotals").innerText += `${data.username}, ${data.subtotal}\n`
      })
    })
  }catch(error){
    throw(error)
  }
}


async function deleteUser(){
  try{
    const deleteHandler = async (tripID) => {
      // currently, endpoint only prints out selected item
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      await fetch(`api/${apiVersion}/trips/delete?tripID=${tripID}`, requestOptions)
    }
    deleteHandler(tripID)
    navigate("/mainpage")
  }catch(error){
    throw(error)
  }
}

}
export default ShoppingPage;