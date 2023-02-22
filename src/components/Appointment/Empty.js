import Appointment from "components/Appointment";
import React from "react";

export default function Empty(props) {
	return (
		<main
			onClick={props.onAdd}
			className='appointment__add'>
			<img
				className='appointment__add-button'
				src='images/add.png'
				alt='Add'
			/>
		</main>
	);
}
