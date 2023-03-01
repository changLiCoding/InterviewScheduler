import reducer, {
	SET_INTERVIEW,
	SET_APPLICATION_DATA,
	SET_DAY,
} from "./Application";

describe("Application Reducer", () => {
	it("thows an error with an unsupported type", () => {
		expect(() => reducer({}, { type: null })).toThrowError(
			/tried to reduce with unsupported action type/i
		);
	});
});
