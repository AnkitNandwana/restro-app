"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/_components/AddFoodItem.css";

const EditFoodItem = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    getFoodItem();
  }, [])

  const getFoodItem = async () => {
    let response = await fetch("http://localhost:3001/api/v1/food_items/"+ props.params.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    console.log(response)
    setName(response.name)
    setPrice(response.price)
    setImagePath(response.image_path)
    setDescription(response.description)
  };

  const handleEditFood = async () => {
    const restoData = JSON.parse(localStorage.getItem("restaurantUser"));
    let restoId = restoData.id;
    let response = await fetch("http://localhost:3001/api/v1/food_items/"+ props.params.id, {
      method: 'PUT',
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
    console.log(response)
    alert("Food have been saved successfully!");
    router.push("/restaurant/dashboard");
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
        <button className="button-login" onClick={handleEditFood}>
          Save Food
        </button>

        <button className="button-login" onClick={() => router.push('../dashboard/')}>
          Back to Food List
        </button>
      </div>
    </div>
  );
};

export default EditFoodItem;
