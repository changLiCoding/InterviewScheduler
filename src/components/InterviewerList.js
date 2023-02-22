import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
	const { interviewers, setInterviewer, interviewer } = props;
	return (
		<section className='interviewers'>
			<h4 className='interviewers__header text--light'>Interviewer</h4>
			<ul className='interviewers__list'>
				{interviewers.map((interviewerFromInterviewers) => (
					<InterviewerListItem
						key={interviewerFromInterviewers.id}
						name={interviewerFromInterviewers.name}
						avatar={interviewerFromInterviewers.avatar}
						setInterviewer={() =>
							setInterviewer(interviewerFromInterviewers.id)
						}
						selected={interviewerFromInterviewers.id === interviewer}
					/>
				))}
			</ul>
		</section>
	);
}
