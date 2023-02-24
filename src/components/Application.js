import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});
	let dailyAppointments = [];
	let dailyInterviewers = [];

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
	dailyAppointments = getAppointmentsForDay(state, state.day);
	dailyInterviewers = getInterviewersForDay(state, state.day);
	return (
		<main className='layout'>
			<section className='sidebar'>
				{/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
				<img
					className='sidebar--centered'
					src='images/logo.png'
					alt='Interview Scheduler'
				/>
				<hr className='sidebar__separator sidebar--centered' />
				<nav className='sidebar__menu'>
					<DayList
						days={state.days}
						value={state.day}
						onChange={setDay}
					/>
				</nav>
				<img
					className='sidebar__lhl sidebar--centered'
					src='images/lhl.png'
					alt='Lighthouse Labs'
				/>
			</section>
			<section className='schedule'>
				{dailyAppointments.map((appointment) => {
					const interview = getInterview(state, appointment.interview);
					return (
						<Appointment
							key={appointment.id}
							{...appointment}
							interview={interview}
							interviewers={dailyInterviewers}
						/>
					);
				})}
				<Appointment
					key='last'
					time='5pm'
				/>
			</section>
		</main>
	);
}
