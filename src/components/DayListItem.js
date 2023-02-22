import React, { useState } from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
	const formatSpots = (spot) => {
		let res = !spot
			? "no spots remaining"
			: spot === 1
			? "1 spot remaining"
			: `${spot} spots remaining`;
		return res;
	};
	// const [isSelected, setIsSelected] = useState(false);

	const itemClass = classNames("day-list__item", {
		"day-list__item--selected": props.name === props.day,
		"day-list__item--full": props.spots === 0,
	});

	return (
		<li
			className={itemClass}
			onClick={(event) => {
				console.log(event);
				props.setDay(props.name);
				console.log(props.day);
				// setIsSelected(!isSelected);
			}}>
			<h2 className='text--regular'>{props.name}</h2>
			<h3 className='text--light'>{formatSpots(props.spots)}</h3>
		</li>
	);
}
