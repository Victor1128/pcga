import "./ProductList.css";
import Navbar from "./Navbar";
import { useState } from "react";

export default function ProductList({ data }) {
	const [currCategory, setCurrCategory] = useState(0);
	const [currSubcategory, setCurrSubcategory] = useState(0);

	return (
		<>
			<Navbar
				categories={data.categories}
				setCurrCategory={setCurrCategory}
				setCurrSubcategory={setCurrSubcategory}
			/>
			<div className="product-list">
				<a href={data.url} target="_blank">
					<h1 className="list-title">{data.title}</h1>
				</a>
				<ul className="list">
					{data.categories[currCategory].subcategories[currSubcategory].products.map(
						(product) => (
							<ProductCard key={product.title} product={product} />
						)
					)}
				</ul>
			</div>
		</>
	);
}

function ProductCard({ product }) {
	console.log(product);
	return (
		<div className="product-overlay">
			<div className="product-card">
				{product.image ? (
					<img src={product.image} alt={product.title} />
				) : (
					<div className="no-image">
						<p>No image available</p>
					</div>
				)}
				<h2 className="product-name">{product.title}</h2>
			</div>
		</div>
	);
}
