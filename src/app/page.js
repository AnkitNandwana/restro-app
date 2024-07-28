"use client";
import Image from "next/image";
import styles from "./page.module.css";
import "@/app/restaurant/style.css";
import CustomerHeader from "./_components/CustomerHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [listItem, setListItem] = useState();
  const [showLocation, setShowLocation] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();


  useEffect(() => {
    loadLocations();
    loadResaturants();
  }, []);

  const handleListItem = (item) => {
    setListItem(item)
    setShowLocation(false)
    loadResaturants({city: item})

  }

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3001/api/v1/restaurants", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    if (response.success) {
      let cities = response.result.map((item) =>
        item.city.charAt(0).toUpperCase() + item.city.slice(1)
      );
      cities = [...new Set(cities)];
      console.log(cities); // Log here to see the transformed response
      setLocations(cities);
    }
  };

  const loadResaturants = async (params) => {
    let url = "http://localhost:3001/api/v1/restaurants"
    if (params?.city){
      url = url +"?city=" + params.city
    }
    else if(params?.name){
        url = url + "?name=" + params.name
    }
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result)
    }
  };

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input type="select" placeholder="Enter City" className="select-input" value={listItem} onClick={() => setShowLocation(true)}></input>
          <ul className="location-list">
            {showLocation && locations.map((item, index) => (
              <li key={index} onClick={() => handleListItem(item)}>{item}</li>
            ))}
          </ul>
          <input type="select" placeholder="Enter Food/Restaurant Name" className="search-input" onChange={(event) => loadResaturants({name: event.target.value})}></input>
        </div>
      </div>

      <div className="restaurant-list-container">
        {
          restaurants.map((item, index) => (
            <div key={index} onClick={() => router.push('/explore/'+item.name + "?id="+item.id)} className="restaurant-wrapper" >
              <div className="heading-wrapper">
                <h3>{item.name}</h3>
                <h5>Contact: {item.contact}</h5>
              </div>
              <div className="address-wrapper">
                <div>{item.city}</div>
                <div>{item.address}</div>
              </div>
            </div>
          ))}
      </div>
    </main >
  );
}
