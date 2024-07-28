"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const DeliveryPartnerLogin = (props) => {

  const [contact, setContact] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {

    console.log(contact, password)
    if (!contact || !password) {
      setError(true)
    }
    else {
      setError(false)
      let response = await fetch("http://localhost:3001/api/v1/delivery_partners/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          delivery_partner: {
            contact,
            password
          }
        }),
      });
      response = await response.json();
      if (response.success) {
        alert("Login Success")
        localStorage.setItem("logindeliverypartner", JSON.stringify(response.result))
        router.push("/deliveryPartner/" + 'sheru')
      }
      else {
        alert(response.result)
      }
    }
  }

  return (

    <div>
      <div>
        <div>
          <input className="input-wrapper" type='text' placeholder="Enter contact " value={contact} onChange={(e) => setContact(e.target.value)}></input>

        </div>
        {error && !contact && <span className="input-error"> Please Enter contact </span>}
        <div>
          <input className="input-wrapper" type='password' placeholder="Enter Password " value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        {error && !password && <span className="input-error"> Please Enter Password </span>}
      </div>
      <button className="button" onClick={handleLogin}> Login</button>

    </div>
  )
}

export default DeliveryPartnerLogin;