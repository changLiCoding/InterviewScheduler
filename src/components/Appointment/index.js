import "./styles.scss";
import React from "react";

export default function Appointment(props) {
	const { time } = props;
	return <article className='appointment'>{time}</article>;
}
