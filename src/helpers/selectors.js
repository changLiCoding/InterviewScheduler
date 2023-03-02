export const getAppointmentsForDay = function (state, day) {
	let res = [];
	if (state.days.length === 0) {
		return [];
	}
	const checkDayValue = day;
	const appointmentIdArr = state.days.filter(
		(day) => day.name === checkDayValue
	)[0]?.appointments;
	if (!appointmentIdArr) return res;
	const allAppointmentsArr = Object.values(state.appointments);

	res = allAppointmentsArr.filter((appointment) =>
		appointmentIdArr.includes(appointment.id)
	);
	return res;
};

export const getInterviewersForDay = function (state, day) {
	let res = [];
	if (state.days.length === 0) {
		return [];
	}
	const checkDayValue = day;
	const interviewersIdArr = state.days.filter(
		(day) => day.name === checkDayValue
	)[0]?.interviewers;
	if (!interviewersIdArr) return res;

	const allInterviewersArr = Object.values(state.interviewers);
	res = allInterviewersArr.filter((interviewer) =>
		interviewersIdArr.includes(interviewer.id)
	);
	return res;
};

export const getInterview = function (state, interview) {
	if (interview === null) return null;
	const interviewer = state.interviewers[interview.interviewer];
	return { ...interview, interviewer };
};
