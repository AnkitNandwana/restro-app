"use client"
import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";
import RestoHeader from "@/app/_components/RestoHeader";
import "@/app/restaurant/style.css";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);
  const pathName = usePathname();

  return (
    <div>
      <RestoHeader />
      <h1>Welcome to Dashboard</h1>
      <div>
        {!addItem ? (
          <button className="button-login" onClick={() => setAddItem(true)}>Add Food</button>
        ) : (
          <button className="button-login" onClick={() => setAddItem(false)}>Dashboard</button>
        )}
      </div>
      {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
    </div>
  );
}

export default Dashboard;
