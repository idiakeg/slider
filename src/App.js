import { useRef, useState } from "react";
import "./App.css";
import data from "./data";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import { useEffect } from "react";

function App() {
	const [people, setPeople] = useState(data);
	const [location, setLocation] = useState(0);
	const [clickCount, setClickCount] = useState(0);

	const scroller = useRef(null);

	const handleClick = (direction) => {
		let newCount = clickCount + 1;
		let distance = scroller.current.getBoundingClientRect().width;
		let change = distance / people.length;

		if (direction === "next" && newCount <= 3) {
			setClickCount((prev) => prev + 1);

			let nextLocation = location + change;
			setLocation((prev) => prev + change);
			scroller.current.style.transform = `translateX(-${nextLocation}px)`;
		}
		if (direction === "previous" && location > 0) {
			setClickCount((prev) => prev - 1);

			let prevLocation = location - change;
			setLocation((prev) => prev - change);
			scroller.current.style.transform = `translateX(-${prevLocation}px)`;
		}
	};

	return (
		<div className="app">
			<header>
				<h1>Reviews</h1>
			</header>
			<section>
				<article ref={scroller}>
					{people.map(({ id, name, title, quote, image }) => {
						return (
							<div key={id} className={`slider__container`}>
								<div className="image">
									<img src={image} alt={name} />
								</div>
								<button
									onClick={() => handleClick("previous")}
									className={`left ${clickCount === 0 ? "none" : ""}`}
								>
									<FiChevronLeft />
								</button>
								<p className="name">{name}</p>
								<p className="title">{title}</p>
								<p className="quote">{quote}</p>
								<span>
									<FaQuoteRight />
								</span>
								<button
									onClick={() => handleClick("next")}
									className={`right ${clickCount === 3 ? "none" : ""}`}
								>
									<FiChevronRight />
								</button>
							</div>
						);
					})}
				</article>
			</section>
		</div>
	);
}

export default App;
