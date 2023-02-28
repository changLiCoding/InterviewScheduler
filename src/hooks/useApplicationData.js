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
			setState((prev) => ({
				...prev,
				appointments,
			}));
		});
	};

	const cancelInterview = function (id) {
		return axios.delete(`/api/appointments/${id}`, { interview: null });
		// .catch((err) =>
		// 	console.error(`Got error from deleting interview: ${err.message}`)
		// );
	};

	return { setDay, state, cancelInterview, bookInterview };
}
