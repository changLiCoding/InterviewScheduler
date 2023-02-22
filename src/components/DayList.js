import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
	const { days: allDays, value, onChange } = props;

	return (
		<ul>
			{allDays.map((dayFromAllDays) => (
				<DayListItem
					{...dayFromAllDays}
					key={dayFromAllDays.id}
					onChange={onChange}
					selected={dayFromAllDays.name === value}
				/>
			))}
		</ul>
	);
}
