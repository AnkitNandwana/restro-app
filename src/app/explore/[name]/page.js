"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import { useEffect, useState } from "react";
import "@/app/explore/explore.css";


const RestroPage = (props) => {
  const name = props.params.name;
  const id = props.searchParams.id;
  const [foodItems, setFoodItems] = useState([]);
  const [restroDetails, setRestroDetails] = useState({});
  const [cartData, setCartData] = useState([]);
  const [removeCartData, setRemoveCartData] = useState(null);
  const [cartStorage, setCartStorage] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  const [cartIds, setCartIds] = useState(
    cartStorage.map((item) => item.id)
  );

  const addToCart = (item) => {
    setCartData(item);
    setCartIds([...cartIds, item.id]);
    setRemoveCartData(null);
  };

  const RemoveFromCart = (id) => {
    setRemoveCartData(id);
    setCartIds(cartIds.filter((item) => item !== id));
    setCartData(null);
  };

  useEffect(() => {
    GetRestroDetails();
    GetFoodItemList();
  }, []);

  const GetRestroDetails = async () => {
    let response = await fetch(`http://localhost:3001/api/v1/restaurants/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      let data = await response.json();
      setRestroDetails(data);
    }
  };

  const GetFoodItemList = async () => {
    try {
      let response = await fetch(`http://localhost:3001/api/v1/food_items?restaurant_id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        let data = await response.json();
        setFoodItems(data);
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  return (
    <div>
      <CustomerHeader cartData={cartData} removeCartItem={removeCartData} />
      <div className="restaurant-page-banner">
        <h1>{decodeURI(name)}</h1>
        <div className="restro-detail-wrapper">
          <h3>Contact: {restroDetails?.contact}</h3>
          <h3>City: {restroDetails?.city}</h3>
          <h3>Address: {restroDetails?.address}</h3>
        </div>

        <div className="food-item-wrapper">
          {foodItems.length > 0 ? (
            foodItems.map((item, index) => (
              <div key={index} className="food-list-item">
                <div className="food-image-container">
                <img src="/samosa.jpeg"></img>
                </div>
                <div className="food-details">
                  <div className="food-name">{item.name}</div>
                  <div className="food-price">₹{item.price}</div>
                  <div className="food-description">{item.description}</div>
                  {cartIds.includes(item.id) ? (
                    <button className="button" onClick={() => RemoveFromCart(item.id)}>Remove from Cart</button>
                  ) : (
                    <button className="button" onClick={() => addToCart(item)}>Add to Cart</button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <h1>No Food Item Available for Selected Restaurant</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestroPage;
