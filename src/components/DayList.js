import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
	const { days: allDays, day, setDay } = props;

	const resetClass = () => {};

	return (
		<ul>
			{allDays.map((dayFromAllDays) => (
				<DayListItem
					{...dayFromAllDays}
					key={dayFromAllDays.id}
					setDay={setDay}
					day={day}
					resetClass={resetClass}
				/>
			))}
		</ul>
	);
}
