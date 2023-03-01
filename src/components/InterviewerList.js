import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
	const { interviewers, onChange, value } = props;
	return (
		<section className='interviewers'>
			<h4 className='interviewers__header text--light'>Interviewer</h4>
			<ul className='interviewers__list'>
				{interviewers.map((interviewerFromInterviewers) => (
					<InterviewerListItem
						key={interviewerFromInterviewers.id}
						name={interviewerFromInterviewers.name}
						avatar={interviewerFromInterviewers.avatar}
						setInterviewer={() => onChange(interviewerFromInterviewers.id)}
						selected={interviewerFromInterviewers.id === value}
					/>
				))}
			</ul>
		</section>
	);
}

InterviewerList.propTypes = {
	interviewers: PropTypes.array.isRequired,
};
