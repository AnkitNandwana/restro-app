import { useState } from "react";
import './style.css'; // Ensure you import the CSS file
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    let response = await fetch("http://localhost:3001/api/v1/restaurants", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        restaurant: {
          name,
          email,
          city,
          password,
          address,
          contact
        }
      }),
    });
    response = await response.json()
    alert("Restaurant created")
    localStorage.setItem("restaurantUser", JSON.stringify(response.result))
    
    router.push("/restaurant/dashboard")
  //   if (response.ok) {
  //     const data = await response.json();
  //     alert("Restaurant created")
  //     console.log('Restaurant created:', data);
  //   } else {
  //     console.error('Failed to create restaurant');
  //   }
  // }
  };

  return (
    <div className="signup-wrapper">
      <h3>Sign Up</h3>
      <div className="form-wrapper">
        <div className="form-group">
          <input className="input-wrapper" type='text' placeholder="Enter Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="form-group">
          <input className="input-wrapper" type='text' placeholder="Enter Restaurant Name" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="form-group">
          <input className="input-wrapper" type='password' placeholder="Enter Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div className="form-group">
          <input className="input-wrapper" type='password' placeholder="Confirm Password" value={c_password} onChange={(event) => setC_password(event.target.value)} />
        </div>
        <div className="form-group">
          <input className="input-wrapper" type='text' placeholder="Enter City" value={city} onChange={(event) => setCity(event.target.value)} />
        </div>
        <div className="form-group">
          <input className="input-wrapper" type='text' placeholder="Enter Address" value={address} onChange={(event) => setAddress(event.target.value)} />
        </div>
        <div className="form-group">
          <input className="input-wrapper" type='text' placeholder="Enter Contact No." value={contact} onChange={(event) => setContact(event.target.value)} />
        </div>
        <div className="form-group">
          <button className="button" onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
      <div className="footer-wrapper">
        All Rights Reserved.
      </div>
    </div>
  );
};

export default SignUpPage;
