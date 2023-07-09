import logo from "./logo.svg";
import "./App.css";
import ProductList from "./components/ProductList";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

const productCategories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Books",
  "Sports & Outdoors",
  "Automotive",
  "Toys & Games",
  "Health & Wellness",
  "Baby & Kids",
  "Grocery",
  "Jewelry",
  "Pets",
  "Tools & Home Improvement",
  "Movies & Music",
  "Office Supplies",
  "Garden & Outdoor",
  "Food & Beverages",
  "Fitness",
  "Travel",
  "Art & Craft",
  "Party Supplies",
  "Stationery",
  "Pet Supplies",
  "Appliances",
  "Furniture",
  "Gifts",
  "Industrial & Scientific",
  "Hobbies",
  "Fashion Accessories",
];

const allProducts = [
  { title: "Pen" },
  { title: "Laptop" },
  { title: "Soap" },
  { title: "Sunglasses" },
  { title: "Toothbrush" },
  { title: "Headphones" },
  { title: "Umbrella" },
  { title: "Watch" },
  { title: "Backpack" },
  { title: "Smartphone" },
  { title: "Wallet" },
  { title: "Coffee maker" },
  { title: "Bluetooth speaker" },
  { title: "Portable charger" },
  { title: "Hairbrush" },
  { title: "Gaming console" },
  { title: "Dumbbells" },
  { title: "Yoga mat" },
  { title: "Digital camera" },
  { title: "Air purifier" },
  { title: "Instant pot" },
  { title: "Smart thermostat" },
  { title: "Fitness tracker" },
  { title: "Resistance bands" },
  { title: "Cordless vacuum" },
  { title: "Espresso machine" },
  { title: "Electric toothbrush" },
  { title: "Wireless earbuds" },
  { title: "Food processor" },
  { title: "Electric kettle" },
];

function App() {
  const [data, setData] = useState("");

  // aici ar trebui request-ul catre server
  const handleRequest = async (url) => {
    console.log(url);
    console.log("http://localhost:5000/getd/" + url);
    // const response =
    const response = await fetch("http://localhost:5000/getd/" + url).then(
      (response) => response.json()
    );
    // const data1 = await response.json();
    // setData(data1);
    setData(response);
  };

  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage handleRequest={handleRequest} />} />
        <Route path="/products" element={<ProductList data={data} />} />
      </Routes>
    </Router>
  );
}

export default App;
