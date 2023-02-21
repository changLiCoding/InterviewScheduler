import React, { useState } from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
	const [isSelected, setIsSelected] = useState(false);
	const itemClass = classNames("day-list__item", {
		"day-list__item--selected": isSelected,
		"day-list__item--full": props.spots === 0,
	});
	return (
		<li
			className={itemClass}
			onClick={() => {
				props.setDay(props.name);
				setIsSelected(!isSelected);
			}}>
			<h2 className='text--regular'>{props.name}</h2>
			<h3 className='text--light'>{props.spots} spots remaining</h3>
		</li>
	);
}
