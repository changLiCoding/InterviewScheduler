import { useEffect, useReducer } from "react";
import axios from "axios";

import reducer, {
	SET_INTERVIEW,
	SET_APPLICATION_DATA,
	SET_DAY,
} from "reducers/Application";

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

		ws.onmessage = (event) => {
			const msgFromServer = JSON.parse(event.data);
			if (msgFromServer?.type) {
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
		return () => {
			ws.close();
		};
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
