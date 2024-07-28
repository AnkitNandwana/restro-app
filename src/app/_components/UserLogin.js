"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLoginPage = (props) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {

    console.log(email, password)
    if (!email || !password) {
      setError(true)
    }
    else {
      setError(false)
      let response = await fetch("http://localhost:3001/api/v1/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            email,
            password
          }
        }),
      });
      response = await response.json();
      if (response.success) {
        alert("Login Success")
        localStorage.setItem("loginuser", JSON.stringify(response.result))
        if (props?.redirect?.order) {
          router.push("/order")
        }
        else {
          router.push("/")
        }
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
          <input className="input-wrapper" type='text' placeholder="Enter Email " value={email} onChange={(e) => setEmail(e.target.value)}></input>

        </div>
        {error && !email && <span className="input-error"> Please Enter email </span>}
        <div>
          <input className="input-wrapper" type='password' placeholder="Enter Password " value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        {error && !password && <span className="input-error"> Please Enter Password </span>}
      </div>
      <button className="button" onClick={handleLogin}> Login</button>

    </div>
  )
}

export default UserLoginPage;