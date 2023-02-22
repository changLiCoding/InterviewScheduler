import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
	const { days: allDays, day, setDay } = props;

	return (
		<ul>
			{allDays.map((dayFromAllDays) => (
				<DayListItem
					{...dayFromAllDays}
					key={dayFromAllDays.id}
					setDay={setDay}
					selected={dayFromAllDays.name === day}
				/>
			))}
		</ul>
	);
}
