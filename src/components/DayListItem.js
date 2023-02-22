import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
	const { selected } = props;
	const formatSpots = (spot) => {
		let res = !spot
			? "no spots remaining"
			: spot === 1
			? "1 spot remaining"
			: `${spot} spots remaining`;
		return res;
	};

	const itemClass = classNames("day-list__item", {
		"day-list__item--selected": selected,
		"day-list__item--full": props.spots === 0,
	});

	return (
		<li
			className={itemClass}
			onClick={(event) => {
				props.onChange(props.name);
				// setIsSelected(!isSelected);
			}}>
			<h2 className='text--regular'>{props.name}</h2>
			<h3 className='text--light'>{formatSpots(props.spots)}</h3>
		</li>
	);
}
