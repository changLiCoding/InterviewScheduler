import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
	const { onCancel, onSave, interviewers } = props;
	const [student, setStudent] = useState(props.student || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const reset = () => {
		setInterviewer(null);
		setStudent("");
	};
	const cancel = () => {
		reset();
		onCancel();
	};
	return (
		<main className='appointment__card appointment__card--create'>
			<section className='appointment__card-left'>
				<form
					autoComplete='off'
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<input
						onChange={(e) => setStudent(e.target.value)}
						className='appointment__create-input text--semi-bold'
						name='name'
						type='text'
						placeholder='Enter Student Name'
						/*
          This must be a controlled component
          your code goes here
        */
					/>
				</form>
				<InterviewerList
					interviewers={interviewers}
					onChange={setInterviewer}
					value={interviewer}
				/>
			</section>
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button
						danger
						onClick={cancel}>
						Cancel
					</Button>
					<Button
						confirm
						onClick={() => onSave(student, interviewer)}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
