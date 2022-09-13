import { useState } from "react";
import "./App.css";
import data from "./data";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import { useEffect } from "react";

function App() {
	const [people, setPeople] = useState(data);
	const [currIndex, setCurrIndex] = useState(0);

	const currentNumber = (number) => {
		if (number > people.length - 1) {
			return 0;
		} else if (number < 0) {
			return people.length - 1;
		}

		return number;
	};

	const handlePrevious = () => {
		setCurrIndex((prev) => {
			let newNumber = prev - 1;
			return currentNumber(newNumber);
		});
	};
	const handleNext = () => {
		setCurrIndex((prev) => {
			let newNumber = prev + 1;
			return currentNumber(newNumber);
		});
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrIndex((prev) => {
				let newNumber = prev + 1;
				return currentNumber(newNumber);
			});
		}, 3000);

		return () => {
			clearInterval(interval);
		};
	}, [currIndex, currentNumber]);

	return (
		<div className="app">
			<header>
				<h1>Reviews</h1>
			</header>
			<section>
				<button onClick={handlePrevious} className="left">
					<FiChevronLeft />
				</button>
				{people.map(({ id, name, title, quote, image }, personIndex) => {
					let position = "default";
					if (personIndex === currIndex) {
						position = "active";
					}
					if (currIndex - personIndex === 1) {
						position = "previous";
					}
					return (
						<div key={id} className={`slider__container  ${position}`}>
							<div className="image">
								<img src={image} alt={name} />
							</div>
							<p className="name">{name}</p>
							<p className="title">{title}</p>
							<p className="quote">{quote}</p>
							<span>
								<FaQuoteRight />
							</span>
						</div>
					);
				})}
				<button onClick={handleNext} className="right">
					<FiChevronRight />
				</button>
			</section>
		</div>
	);
}

export default App;
