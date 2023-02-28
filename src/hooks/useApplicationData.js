import { useEffect, useReducer } from "react";

import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const DELETE_INTERVIEW = "DELETE_INTERVIEW";

const updateSpots = (id, newState) => {
	const theDayOfAppointmentsObj = newState.days.find((day) =>
		day.appointments.includes(id)
	);
	console.log(theDayOfAppointmentsObj);
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

	const days = newState.days.map((day) => {
		if (day.id === theDayOfAppointmentsObj.id) {
			return theDayOfAppointmentsObj;
		} else {
			return day;
		}
	});
	newState.days = days;
	return newState;
};

const reducer = function (state, action) {
	switch (action.type) {
		case SET_DAY:
			console.log(action.day);
			return { ...state, day: action.day };
		case SET_APPLICATION_DATA:
			console.log(action.days, action.interviewers);
			return {
				...state,
				appointments: action.appointments,
				days: action.days,
				interviewers: action.interviewers,
			};
		case SET_INTERVIEW:
			return { ...state, ...updateSpots(action.id, { ...action.newState }) };
		case DELETE_INTERVIEW:
			return { ...state, ...updateSpots(action.id, { ...action.newState }) };

		default:
			throw new Error(`
      Tried to reduce with unsupported action type: ${action.type}
      `);
	}
};

export default function useApplicationData() {
	const [state, dispatch] = useReducer(reducer, {
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = (day) => dispatch({ type: SET_DAY, day });

	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
		])
			.then((res) => {
				dispatch({
					type: SET_APPLICATION_DATA,
					days: res[0].data,
					appointments: res[1].data,
					interviewers: res[2].data,
				});
			})
			.catch((err) => console.error(err));
	}, []);

	const bookInterview = function (id, interview) {
		return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
			const appointment = {
				...state.appointments[id],
				interview: { ...interview },
			};

			const appointments = {
				...state.appointments,
				[id]: appointment,
			};
			dispatch({
				type: SET_INTERVIEW,
				id,
				newState: { ...state, appointments },
			});
		});
	};

	const cancelInterview = function (id) {
		return axios
			.delete(`/api/appointments/${id}`, { interview: null })
			.then(() => {
				const appointment = {
					...state.appointments[id],
					interview: null,
				};

				const appointments = {
					...state.appointments,
					[id]: appointment,
				};

				dispatch({
					type: DELETE_INTERVIEW,
					id,
					newState: { ...state, appointments },
				});
			});
	};

	return {
		setDay,
		state,
		cancelInterview,
		bookInterview,
	};
}
