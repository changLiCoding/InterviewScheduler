import { useEffect, useReducer } from "react";

import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

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

export default function useApplicationData() {
	const [state, dispatch] = useReducer(reducer, {
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = (day) => dispatch({ type: SET_DAY, day });

	useEffect(() => {
		const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
		ws.onopen = (event) => {
			ws.send(`ping`);
		};

		ws.onmessage = (event) => {
			const msgFromServer = JSON.parse(event.data);
			if (msgFromServer.type) {
				const { type, id, interview } = msgFromServer;
				const dataToUpdate = { id, interview };
				dispatch({ type, dataToUpdate });
			}
		};
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
		const dataToUpdate = { id, interview };
		return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
			dispatch({
				type: SET_INTERVIEW,
				dataToUpdate,
			});
		});
	};

	const cancelInterview = function (id) {
		return axios.delete(`/api/appointments/${id}`).then(() => {
			const interview = null;
			const dataToUpdate = { id, interview };
			dispatch({
				type: SET_INTERVIEW,
				dataToUpdate,
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
