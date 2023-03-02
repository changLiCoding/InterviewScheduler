export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

const updateSpots = (id, state, interview) => {
	let appointment,
		appointments = {};
	if (interview === null) {
		appointment = {
			...state.appointments[id],
			interview: null,
		};
	} else {
		appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
	}

	appointments = {
		...state.appointments,
		[id]: appointment,
	};

	const newState = { ...state, appointments };

	const theDayOfAppointmentsObj = newState.days.find((day) =>
		day.appointments.includes(id)
	);
	const spotsOfTheDay = theDayOfAppointmentsObj.appointments.reduce(
		(prev, curv) => {
			if (newState.appointments[curv].interview === null) {
				prev++;
			}
			return prev;
		},
		0
	);
	theDayOfAppointmentsObj.spots = spotsOfTheDay;

	const days = newState.days.map((day) =>
		day.id === theDayOfAppointmentsObj.id ? theDayOfAppointmentsObj : day
	);

	newState.days = days;
	return newState;
};

const reducer = function (state, action) {
	switch (action.type) {
		case SET_DAY:
			return { ...state, day: action.day };
		case SET_APPLICATION_DATA:
			return {
				...state,
				appointments: action.appointments,
				days: action.days,
				interviewers: action.interviewers,
			};
		case SET_INTERVIEW:
			const newState = updateSpots(
				action.dataToUpdate.id,
				state,
				action.dataToUpdate.interview
			);
			return {
				...state,
				...newState,
			};

		default:
			throw new Error(`
      Tried to reduce with unsupported action type: ${action.type}
      `);
	}
};

export default reducer;
