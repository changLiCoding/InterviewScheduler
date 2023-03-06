import { useState } from "react";

export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	const transition = function (newMode, replace = false) {
		if (replace === true) {
			console.log(`Prev History if Replace: ${history}`);
			setHistory((prev) => {
				return prev.slice(0, prev.length - 1);
			});
			console.log(`History After Replace: ${history}`);
		} else {
			setHistory((prev) => [...prev, newMode]);
		}
		setMode(newMode);
	};

	const back = function () {
		console.log(`History before click back: ${history}`);
		if (history.length > 1) {
			const lastMode = history[history.length - 1];
			console.log(`lastMode: ${lastMode}`);
			setHistory((prev) => prev.slice(0, prev.length - 1));

			setMode(lastMode);
			console.log(`History after click back: ${history}`);
		} else {
			setMode(initial);
		}
	};
	return { mode, transition, back };
}
