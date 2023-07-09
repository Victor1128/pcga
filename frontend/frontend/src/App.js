import logo from "./logo.svg";
import "./App.css";
import ProductList from "./components/ProductList";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

const dataObj = {
  url: "https://www.amazon.com/",
  title: "Site name",
  field: "E-commerce",
  // categories: productCategories.map((category) => ({
  // 	title: category,
  // 	subcategories: [`1 - ${category}`, `2 - ${category}`, `3 - ${category}`].map(
  // 		(subcategory) => ({
  // 			title: subcategory,
  // 			products: allProducts.map(({ title }) => ({
  // 				title: title + " " + subcategory,
  // 			})),
  // 		})
  // 	),
  // })),
  categories: [
    {
      title: "other",
      subcategories: [
        {
          title: "other",
          products: [
            {
              title: "Soul Music",
            },
            {
              title: "After Dark Grooves",
            },
            {
              title: "Music Related",
            },
            {
              title: "Slow Jams",
            },
            {
              title: "Music Fan",
            },
            {
              title: "Soulful House",
            },
            {
              title: "House Music",
            },
          ],
        },
      ],
    },
    {
      title: "public utilities and public sector related services",
      subcategories: [
        {
          title: "telecommunications media services",
          products: [
            {
              title: "Radio Music",
            },
            {
              title: "Radio Stations",
            },
          ],
        },
      ],
    },
    {
      title:
        "domestic appliances and supplies and consumer electronic products",
      subcategories: [
        {
          title: "consumer electronics",
          products: [
            {
              title: "Tv Tuning",
            },
          ],
        },
      ],
    },
    {
      title: "education and training services",
      subcategories: [
        {
          title: "specialized educational services",
          products: [
            {
              title: "Dance & Music",
            },
          ],
        },
      ],
    },
  ],
};

function App() {
  const [data, setData] = useState(dataObj);

  // aici ar trebui request-ul catre server
  const handleRequest = async (url) => {
    console.log(url);
    // const response = await fetch('http://localhost:5000/website', {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     url
    // })
    // });
    // const data = await response.json();
    // setData(data);
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
