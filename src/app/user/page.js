"use client";
import { useState } from "react";
import LoginPage from "../_components/UserLogin";
import UserSignUp from "../_components/UserSignUp";
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
        <h1>User Login</h1>
        {login ? <LoginPage redirect = {props.searchParams} /> : <UserSignUp redirect = {props.searchParams} />}
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
