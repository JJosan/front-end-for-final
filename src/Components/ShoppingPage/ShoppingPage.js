import React from 'react'
import './ShoppingPage.css'
import {List, Input, Button } from 'reactstrap'

const tripID = null

function ShoppingPage({ testID }) {
  console.log(testID)
  return (
    <div className='ShoppingPage'>
        <List type="inline" id="shoppingList" onLoad={showList}></List>
        <Input name="itemNameInput" id="itemNameInput" placeholder="Input item name" />
        <Input name="itemQuantityInput" id="itemQuantityInput" placeholder="Input item quantity" />
        <Button onClick={addItem}>add item</Button>
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

async function showList(){
  try {
    let receipt = await fetch(`api/${apiVersion}/items/receipt?tripID=${tripID}`)
    var shoppingList = document.getElementById("shoppingList")
    for (let i = 0; i < receipt.length; i++) {
        var listItem = document.createElement(ListInlineItem)
        listItem.innerHTML = `${receipt[i].NameOfItem}:${receipt[i].Quantity}`
        shoppingList.appendChild(listItem);
    }
  }catch(error) {
    throw(error)
  }
}


export default ShoppingPage