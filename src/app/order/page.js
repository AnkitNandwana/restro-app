"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { DELIVERY_CHARGE, TAX } from "../lib/constant"
import { useRouter } from "next/navigation";
import "@/app/restaurant/style.css";

const CartPage = () => {
  const[UserStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem("loginuser"))); 
  const [localStorageData, setLocalStorageData] = useState(JSON.parse(localStorage.getItem("cart")))
  const [totalPrice] = useState(() => localStorageData?.length == 1 ? localStorageData[0].price : localStorageData?.reduce((sum, item) => sum + parseFloat(item.price), 0))

  const[removeCartData, setRemoveCartData] = useState(false);
  const router = useRouter();

  useEffect(() =>{
    if (!totalPrice){
      router.push("/")
    }
  }, [totalPrice])

  const handlOrder = async() =>{
    
    let user_id = JSON.parse(localStorage.getItem("loginuser")).id
    let cart = JSON.parse(localStorage.getItem("cart"))
    let food_item_ids = cart.map((item) => item.id).toString();
    let delivery_partner_id = 123
    let restaurant_id = cart[0].restaurant_id

    let response = await fetch("http://localhost:3001/api/v1/orders", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order: {
          user_id,
          restaurant_id,
          status: 'confirm',
          date: "2024-07-14",
          delivery_partner_id,
          food_item_ids,
          amount:( totalPrice + DELIVERY_CHARGE + (totalPrice * TAX / 100))

        }
      }),
    });
    response = await response.json();
    if (response.success){
      alert("Order Placed Successfully!!")
      setRemoveCartData(true)
      router.push("/myprofile");
    }
    else{
      alert("Order Failed!")
    }
  }



  console.log(UserStorage)
  return (
    <div>
      <CustomerHeader removeCartData = {removeCartData}/>
      <div className="total-wrapper">
        <div className="block-1">
          <h2>User Details : </h2>

          <div className="row">
            <span>User Name: </span>
            <span>{UserStorage?.name}</span>
          </div>
          <div className="row">
            <span>Address: </span>
            <span>{UserStorage?.address}</span>
          </div>
          <div className="row">
            <span>Contact : </span>
            <span>{UserStorage?.contact}</span>
          </div>

          <h2>Amount Details : </h2>
          <div className="row">
            <span>Food Price : </span>
            <span>{totalPrice}</span>
          </div>
          <div className="row">
            <span>Tax : </span>
            <span>{totalPrice * TAX / 100}</span>
          </div>
          <div className="row">
            <span>Delivery Charge : </span>
            <span>{DELIVERY_CHARGE}</span>
          </div>
          <div className="row">
            <span>Total Amount : </span>
            <span>{totalPrice + DELIVERY_CHARGE + (totalPrice * TAX / 100)}</span>
          </div>
          <h2>Payment Methods : </h2>
          <div className="row">
            <span>Cash On Delivery Amount : </span>
            <span>{totalPrice + DELIVERY_CHARGE + (totalPrice * TAX / 100)}</span>
          </div>
        </div>
        <div className="block-2">
          <button onClick={handlOrder}>Order Now</button>
        </div>
    </div >
        
      </div>
      
  )
}

export default CartPage;
