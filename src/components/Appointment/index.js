import React, { useEffect } from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
	const { interview, time, interviewers, bookInterview, cancelInterview, id } =
		props;
	const { mode, back, transition } = useVisualMode(interview ? SHOW : EMPTY);

	useEffect(() => {
		if (interview && mode === EMPTY) {
			transition(SHOW);
		}
		if (!interview && mode === SHOW) {
			transition(EMPTY);
		}
	}, [interview, mode, transition]);

	const save = function (name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING);
		bookInterview(id, interview)
			.then(() => {
				transition(SHOW);
			})
			.catch((error) => {
				console.error(error);

				transition(ERROR_SAVE, true);
			});
	};

	const onConfirmDestroy = function () {
		transition(DELETING);
		cancelInterview(id)
			.then(() => {
				transition(EMPTY);
			})
			.catch((error) => {
				console.error(error);
				transition(ERROR_DELETE, true);
			});
	};

	return (
		<article className='appointment'>
			<Header time={time} />

			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && interview && (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
					onDelete={() => transition(CONFIRM)}
					onEdit={() => transition(EDIT)}
				/>
			)}

			{mode === CREATE && (
				<Form
					onSave={save}
					interviewers={interviewers}
					student=''
					onCancel={back}
				/>
			)}
			{mode === EDIT && (
				<Form
					student={interview.student}
					interviewer={interview.interviewer.id}
					onCancel={back}
					onSave={save}
					interviewers={interviewers}
				/>
			)}

			{mode === SAVING && <Status message='Saving' />}
			{mode === DELETING && <Status message='Deleting' />}
			{mode === CONFIRM && (
				<Confirm
					onCancel={back}
					onConfirm={onConfirmDestroy}
					message='Are Your Sure to Delete the Interview? '
				/>
			)}
			{mode === ERROR_SAVE && (
				<Error
					message='Something wrong when saving! '
					onClose={back}
				/>
			)}
			{mode === ERROR_DELETE && (
				<Error
					message='Something wrong when deleting the interview'
					onClose={back}
				/>
			)}
		</article>
	);
}
