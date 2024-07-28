import { useState } from "react";
import { useRouter } from "next/navigation";
import "./AddFoodItem.css"; // Import the CSS file

const AddFoodItem = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleAddFood = async () => {
    const restoData = JSON.parse(localStorage.getItem("restaurantUser"));
    let restoId = restoData.id;
    console.log(restoData);

    let response = await fetch("http://localhost:3001/api/v1/food_items", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        food_item: {
          name,
          price,
          image_path: imagePath,
          description,
          restaurant_id: restoId
        }
      }),
    });

    response = await response.json();
    alert("Food Added");
    props.setAddItem(false)
    // router.push("/restaurant/dashboard");
  };

  return (
    <div className="container">
      <h3>Add Food Item</h3>
      <div className="form-group">
        <input
          className="input-wrapper"
          type="text"
          placeholder="Enter Food Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          className="input-wrapper"
          type="text"
          placeholder="Enter Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          className="input-wrapper"
          type="text"
          placeholder="Enter Image Path"
          value={imagePath}
          onChange={(event) => setImagePath(event.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          className="input-wrapper"
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div className="form-group">
        <button className="button-login" onClick={handleAddFood}>
          Add Food
        </button>
      </div>
    </div>
  );
};

export default AddFoodItem;
