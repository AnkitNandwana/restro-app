import { useState } from "react";
import './style.css'; // Ensure you import the CSS file
import { useRouter } from "next/navigation";

const DeliveryPartnerSignUp = (props) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    let response = await fetch("http://localhost:3001/api/v1/delivery_partners", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        delivery_partner: {
          name,
          city,
          password,
          address,
          contact
        }
      }),
    });
    response = await response.json()
    debugger
    localStorage.setItem("logindeliverypartner", JSON.stringify(response.result))
    if (response.success) {
      alert("Delivery Partner created")
      router.push("/deliveryPartner/"+ name)
      // console.log('Restaurant created:', data);
    } else {
      alert(response.result)
      router.push("/deliveryPartner")
    }
  };

  return (
    <div className="signup-wrapper">
      <h3>Sign Up</h3>
      <div className="form-wrapper">
        <div className="form-group">
          <input className="input-wrapper" type='text' placeholder="Enter Delivery Partner Name" value={name} onChange={(event) => setName(event.target.value)} />
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
    </div>
  );
};

export default DeliveryPartnerSignUp;
