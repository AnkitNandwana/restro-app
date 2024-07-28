"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  console.log('cart-data', props.removeCartItem)
  const UserStorage = localStorage.getItem('loginuser') && JSON.parse(localStorage.getItem('loginuser'));
  const [user, setUser] = useState(UserStorage ? UserStorage : undefined)
  const [cartNumber, setCartNumber] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  
  const router = useRouter();

  useEffect(() => {
    const cartStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    setCartItem(cartStorage);
    setCartNumber(cartStorage.length);
  }, []);

  useEffect(() => {
    if (props.cartData) {
      if (cartNumber) {
        if (cartItem[0].restaurant_id !== props.cartData.restaurant_id) {
          localStorage.removeItem("cart");
          setCartNumber(1);
          setCartItem([props.cartData]);
          localStorage.setItem("cart", JSON.stringify([props.cartData]));
        } else {
          let localCartItem = [...cartItem, props.cartData];
          setCartItem(localCartItem);
          setCartNumber(cartNumber + 1);
          localStorage.setItem("cart", JSON.stringify(localCartItem));
        }
      } else {
        setCartNumber(1);
        setCartItem([props.cartData]);
        localStorage.setItem("cart", JSON.stringify([props.cartData]));
      }
    }
  }, [props.cartData]);

  useEffect(() => {
    if (props.removeCartItem) {
      let localCartItem = cartItem.filter((item) => {
        return item.id != props.removeCartItem
      });
      setCartItem(localCartItem)
      setCartNumber(cartNumber - 1);
      localStorage.setItem("cart", JSON.stringify(localCartItem))
      if (localCartItem == 0) {
        localStorage.removeItem("cart")
      }


    }
  }, [props.removeCartItem]);

  useEffect(() =>{
    if(props.removeCartData){
      setCartItem([]);
      setCartNumber(0);
      localStorage.removeItem("cart");

    }

  }, [props.removeCartData])

  const handleLogout =() =>
  {
    localStorage.removeItem("loginuser")
    router.push("/")
  }

  return (
    <div className="header-wrapper">
      <div className="logo">
        <img style={{ width: 100 }} src="/food-delivery.jpg"></img>
      </div>
      <div>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {
            user ?
            <>
               <li><Link href="/myprofile">{user?.name}</Link></li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
                : <><li>
            <Link href="/user">Login / SignUp</Link>
          </li>
          </>
            }
          {/* <li>
            <Link href="/user"></Link>
          </li> */}
          <li>
            <Link href={cartNumber ? "/cart" : "#"} >Cart({cartNumber ? cartNumber : 0})</Link>
          </li>
          <li>
            <Link href="/restaurant/dashboard">Add Restaurant</Link>
          </li>
          <li>
            <Link href="/deliveryPartner">Delivery Partner Login / SignUp</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerHeader;
