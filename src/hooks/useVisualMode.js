import { useState } from "react";

export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	const transition = function (newMode, replace = false) {
		if (replace === true) {
			setHistory((prev) => {
				// return History as: empty create error_save
				const changedHistory = prev.slice(0, prev.length - 1);
				return [...changedHistory, newMode];
			});
		} else {
			setHistory((prev) => [...prev, newMode]);
		}
		setMode(newMode);
	};

	const back = function () {
		if (history.length > 1) {
			const lastMode = history[history.length - 2];
			setHistory((prev) => prev.slice(0, history.length - 1));

			setMode(lastMode);
		} else {
			setMode(initial);
		}
	};
	return { mode, transition, back };
}
