import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";

export default function Appointment(props) {
	const { interview, time, interviewers } = props;
	const { mode, back, transition } = useVisualMode(interview ? SHOW : EMPTY);
	return (
		<article className='appointment'>
			<Header time={time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
				/>
			)}
			{mode === CREATE && (
				<Form
					interviewers={interviewers}
					student=''
					onCancel={back}
				/>
			)}
			{/* {mode === SAVE && <Status message='Saving' />} */}
		</article>
	);
}
