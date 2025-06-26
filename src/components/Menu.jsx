"use client";

import { useState } from "react";
import { allCocktails } from "../../constants";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Menu = () => {
	const contentRef = useRef();
	const [currentIndex, setCurrentIndex] = useState(0);
	const totalCocktails = allCocktails.length;

	useGSAP(() => {
		gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });
		gsap.fromTo(
			".cocktail img",
			{ opacity: 0, xPercent: -100 },
			{ xPercent: 0, opacity: 1, duration: 1, ease: "power1.inOut" }
		);
		gsap.fromTo(
			".details h2",
			{ opacity: 0, yPercent: 100 },
			{ yPercent: 0, opacity: 1, ease: "power1.inOut" }
		);
		gsap.fromTo(
			".details p",
			{ opacity: 0, yPercent: 100 },
			{ yPercent: 0, opacity: 1, delay: 0.25, ease: "power1.inOut" }
		);

		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#menu",
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			})
			.to(".m-right-leaf", { y: 400 }, 0)
			.to(".m-left-leaf", { y: -400 }, 0);
	}, [currentIndex]);

	const gotoSlide = (index) => {
		const newIndex = (index + totalCocktails) % totalCocktails;
		setCurrentIndex(newIndex);
	};

	function getCocktailAt(indexOffset) {
		return allCocktails[
			(currentIndex + indexOffset + totalCocktails) % totalCocktails
		];
	}

	const currentCocktail = getCocktailAt(0);

	return (
		<section id="menu" aria-labelledby="menu-heading">
			<img
				src="/images/slider-left-leaf.png"
				alt="left-leaf"
				id="m-left-leaf"
			/>
			<img
				src="/images/slider-right-leaf.png"
				alt="right-leaf"
				id="m-right-leaf"
			/>
			<h2 id="menu-heading" className="sr-only">
				Cocktail Menu
			</h2>
			<nav className="cocktail-tabs" aria-label="Cocktail Navigation">
				{allCocktails.map((cocktail, index) => {
					const isActive = index === currentIndex;
					return (
						<button
							key={cocktail.id}
							className={`${
								isActive
									? "text-white border-white"
									: "text-white/40 border-white/40"
							}`}
							onClick={() => {
								gotoSlide(index);
							}}
						>
							{cocktail.name}
						</button>
					);
				})}
			</nav>
			<div className="content">
				<div className="arrows">
					<button
						className="text-left"
						onClick={() => gotoSlide(currentIndex - 1)}
					>
						<span>{getCocktailAt(-1).name}</span> {/* prev cocktail */}
						<img
							src="/images/right-arrow.png"
							alt="right-arrow"
							aria-hidden={true}
						/>
					</button>
					<button
						className="text-right"
						onClick={() => gotoSlide(currentIndex + 1)}
					>
						<span>{getCocktailAt(1).name}</span> {/* next cocktail */}
						<img
							src="/images/left-arrow.png"
							alt="left-arrow"
							aria-hidden={true}
						/>
					</button>
				</div>
				<div className="cocktail">
					<img src={currentCocktail.image} />
				</div>
				<div className="recipe">
					<div ref={contentRef} className="info">
						<p>Recipe for:</p>
						<p id="title">{currentCocktail.name}</p>
					</div>
					<div className="details">
						<h2>{currentCocktail.title}</h2>
						<p>{currentCocktail.description}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Menu;
