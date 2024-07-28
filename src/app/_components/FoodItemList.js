import React, { useEffect, useState } from "react";
import "./FoodItemList.css"; // Import the CSS file
import { useRouter } from "next/navigation";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetFoodItemList();
  }, []);
  
  const handlDelete = async (id) =>{
    console.log("Request for delete", id)

    let response = await fetch("http://localhost:3001/api/v1/food_items/"+ id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      let data = await response.json();
      alert("Food Item Destroyed SuccessFully!")
      setFoodItems(foodItems.filter(item => item.id !== id));

    } else {
      console.error("Failed to Delete food item");
    }
  }
  


  const handlEdit = () =>{
    console.log("Request for edit")
  }

  
  const GetFoodItemList = async () => {
    const restoData = JSON.parse(localStorage.getItem("restaurantUser"));
    if (!restoData) {
      console.error("No restaurant user data found");
      return;
    }
  
    let restoId = restoData.id;
  
    try {
      let response = await fetch(`http://localhost:3001/api/v1/food_items?restaurant_id=${restoId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        let data = await response.json();
        setFoodItems(data); // Assuming the response is an array of food items
        console.log("Food Items Loaded:", data);
      } else {
        console.error("Failed to fetch food items");
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  return (
    <div className="table-container">
      <h1>Food Item List</h1>
      <table className="food-item-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td> <button className="button-delete" onClick={() => handlDelete(item.id)}> Delete</button>  <button className="button-delete" onClick={() => router.push('/restaurant/dashboard/'+item.id)}> Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemList;
