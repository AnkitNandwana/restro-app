"use client";
import { useState } from "react";
import DeliveryPartnerLogin from "../_components/DeliveryPartnerLogin";
import DeliveryPartnerSignUp from "../_components/DeliveryPartnerSignUp";
import RestoHeader from "../_components/RestoHeader";
import Footer from "../_components/Footer";
import "@/app/restaurant/style.css";
// import "@/app/_components/style.css";

const User = (props) => {
  const [login, setLogin] = useState(true);

  return (
    <div className="page-container">
      <RestoHeader />
      <main className="content-wrap">
        <h1>Delivery Partner</h1>
        {login ? <DeliveryPartnerLogin redirect = {props.searchParams} /> : <DeliveryPartnerSignUp redirect = {props.searchParams} />}
        <div className="toggle-wrapper">
          <button className="button-login" onClick={() => setLogin(!login)}>
            {login ? "Do not Have Account? Please Sign Up" : "Already Have Account? Please Login"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default User;
