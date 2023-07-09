import "./Navbar.css";

import { useState, useRef } from "react";

// make a navbar component
export default function Navbar({
	categories,
	setCurrCategory,
	setCurrSubcategory,
}) {
	const listRef = useRef(null);
	const [left, setLeft] = useState(0);

	const handleScroll = () => {
		const scrolledLeft = listRef.current.scrollLeft;
	};

	const handleItemHover = (event) => {
		const listItem = event.target;
		const listItemRect = listItem.getBoundingClientRect();
		const listItemPosition = listItemRect.left + window.scrollX;
		setLeft(listItemPosition);
	};

	return (
		<nav className="navbar" ref={listRef} onScroll={handleScroll}>
			{categories.map((category, idx) => (
				<div className="category">
					<DropdownComponent
						name={category.title}
						idx={idx}
						subcategories={category.subcategories}
						handleItemHover={handleItemHover}
						left={left}
						setCurrCategory={setCurrCategory}
						setCurrSubcategory={setCurrSubcategory}
					/>
				</div>
			))}
		</nav>
	);
}

const DropdownComponent = ({
	idx,
	name,
	handleItemHover,
	left,
	subcategories,
	setCurrCategory,
	setCurrSubcategory,
}) => {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);

	const handleDropdownToggle = () => {
		setIsDropdownVisible(!isDropdownVisible);
	};

	const handleDropdownContentHover = () => {
		setIsDropdownVisible(true);
	};

	const handleDropdownContentLeave = () => {
		setIsDropdownVisible(false);
	};

	return (
		<div className="dropdown-container">
			<button
				className="dropdown-trigger"
				onMouseEnter={(e) => {
					handleDropdownToggle();
					handleItemHover(e);
				}}
				onMouseLeave={handleDropdownToggle}
			>
				<p>{name}</p>
			</button>
			{isDropdownVisible && (
				<div
					className="dropdown-content"
					onMouseEnter={handleDropdownContentHover}
					onMouseLeave={handleDropdownContentLeave}
					style={{ left: `${left}px` }}
				>
					{subcategories.map((subcategory, subIdx) => (
						<div
							className="subcategory"
							onClick={() => {
								setCurrCategory(idx);
								setCurrSubcategory(subIdx);
								console.log(idx, subIdx);
							}}
						>
							<p>{subcategory.title}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
