"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { DELIVERY_CHARGE, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";
import "@/app/cart/style.css";


const CartPage = () => {
  const [localStorageData, setLocalStorageData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedData = data.map(item => ({ ...item, quantity: item.quantity || 1 }));
    setLocalStorageData(updatedData);
    calculateTotalPrice(updatedData);
  }, []);

  const calculateTotalPrice = (data) => {
    const total = data.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (id, delta) => {
    const updatedData = localStorageData.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    setLocalStorageData(updatedData);
    calculateTotalPrice(updatedData);
    localStorage.setItem("cart", JSON.stringify(updatedData));
  };

  const handleOrder = () => {
    if (localStorage.getItem("loginuser")) {
      router.push("/order");
    } else {
      router.push("/user?order=true");
    }
  };

  const RemoveFromCart = (id) => {
    const updatedData = localStorageData.filter(item => item.id !== id);
    setLocalStorageData(updatedData);
    calculateTotalPrice(updatedData);
    localStorage.setItem("cart", JSON.stringify(updatedData));
  };

  return (
    <div>
      <CustomerHeader />
      <div className="food-item-wrapper">
        {localStorageData.length > 0 ? (
          localStorageData.map((item, index) => (
            <div key={index} className="food-list-item">
              <div className="food-image-container">
                <img src="/samosa.jpeg"></img>
                </div>
              <div className="food-description">{item.name}</div>
              <div className="list-item-block2">₹{item.price}</div>
              <div className="quantity-controls">
                <button className="item-increment-button" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button className="item-increment-button" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
              <button className="button" onClick={() => RemoveFromCart(item.id)}>Remove</button>
            </div>
          ))
        ) : (
          <div>Your cart is empty</div>
        )}
      </div>
      <div className="total-wrapper">
        <div className="block-1">
          <div className="row">
            <span>Food Price : </span>
            <span>₹{totalPrice || 0}</span>
          </div>
          <div className="row">
            <span>Tax : </span>
            <span>₹{(totalPrice * TAX / 100) || 0}</span>
          </div>
          <div className="row">
            <span>Delivery Charge : </span>
            <span>₹{DELIVERY_CHARGE || 0}</span>
          </div>
          <div className="row">
            <span>Total Amount : </span>
            <span>₹{(totalPrice + DELIVERY_CHARGE + (totalPrice * TAX / 100)) || 0}</span>
          </div>
        </div>
        <div className="block-2">
          <button onClick={handleOrder}>Place Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;