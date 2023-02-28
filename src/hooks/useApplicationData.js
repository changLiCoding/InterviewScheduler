import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = (day) => setState({ ...state, day });

	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
		])
			.then((res) => {
				setState((prev) => ({
					...prev,
					days: res[0].data,
					appointments: res[1].data,
					interviewers: res[2].data,
				}));
				console.log(res);
			})
			.catch((err) => console.error(err));
	}, []);

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
			setState((prev) => {
				let newState = {
					...prev,
					appointments,
				};

				return updateSpots(id, newState);
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
				setState((prev) => {
					const newstate = {
						...prev,
						appointments,
					};
					return updateSpots(id, newstate);
				});
			});
	};

	return { setDay, state, cancelInterview, bookInterview };
}
