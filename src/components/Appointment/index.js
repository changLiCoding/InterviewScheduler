import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import React from "react";

export default function Appointment(props) {
	const { interview, time } = props;
	return (
		<article className='appointment'>
			<Header time={time} />
			{interview ? (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
				/>
			) : (
				<Empty />
			)}
		</article>
	);
}
