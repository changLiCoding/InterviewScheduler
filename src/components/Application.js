import React from "react";

import "components/Application.scss";
import useApplicationData from "hooks/useApplicationData";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
	const { state, setDay, cancelInterview, bookInterview } =
		useApplicationData();
	const dailyAppointments = getAppointmentsForDay(state, state.day);
	const dailyInterviewers = getInterviewersForDay(state, state.day);

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
							bookInterview={bookInterview}
							cancelInterview={cancelInterview}
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
