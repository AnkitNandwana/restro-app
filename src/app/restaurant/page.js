"use client";
import { useState } from "react";
import LoginPage from "../_components/LoginPage";
import SignUpPage from "../_components/SignUpPage";
import RestoHeader from "../_components/RestoHeader";
import Footer from "../_components/Footer";
import "./style.css";

const Restaurant = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="page-container">
      <RestoHeader />
      <main className="content-wrap">
        <h1>Resturant Login</h1>
        {login ? <LoginPage /> : <SignUpPage />}
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

export default Restaurant;
