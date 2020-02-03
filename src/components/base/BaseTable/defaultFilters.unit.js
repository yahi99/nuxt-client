import { filterImplementations } from "./defaultFilters";

describe("defaultFilters", () => {
	it("can filter strings", () => {
		const filterTextContains = filterImplementations["text"]["contains"];

		expect(filterTextContains("test", "te")).toBe(true);
		expect(filterTextContains("test", "a")).toBe(false);
		expect(filterTextContains("Test", "te")).toBe(true);
		expect(filterTextContains(11, 1)).toBe(true);
		expect(filterTextContains(11, 2)).toBe(false);

		const filterTextEquals = filterImplementations["text"]["equals"];

		expect(filterTextEquals("test", "test")).toBe(true);
		expect(filterTextEquals("test", "te")).toBe(false);
		expect(filterTextEquals("Test", "test")).toBe(true);
	});
	it("can filter numbers", () => {
		const filterNumberEqual = filterImplementations["number"]["equal"];

		expect(filterNumberEqual(1, 1)).toBe(true);
		expect(filterNumberEqual(1, 2)).toBe(false);
		expect(filterNumberEqual("11", "11")).toBe(true);
		expect(filterNumberEqual("11", "12")).toBe(false);

		const filterNumberGreater = filterImplementations["number"]["greater"];

		expect(filterNumberGreater(2, 1)).toBe(true);
		expect(filterNumberGreater(1, 1)).toBe(false);
		expect(filterNumberGreater(0, 1)).toBe(false);
		expect(filterNumberGreater("2", "1")).toBe(true);
		expect(filterNumberGreater("1", "1")).toBe(false);
		expect(filterNumberGreater("0", "1")).toBe(false);

		const filterNumberGreaterEqual =
			filterImplementations["number"]["greaterEqual"];

		expect(filterNumberGreaterEqual(2, 1)).toBe(true);
		expect(filterNumberGreaterEqual(1, 1)).toBe(true);
		expect(filterNumberGreaterEqual(0, 1)).toBe(false);
		expect(filterNumberGreaterEqual("2", "1")).toBe(true);
		expect(filterNumberGreaterEqual("1", "1")).toBe(true);
		expect(filterNumberGreaterEqual("0", "1")).toBe(false);

		const filterNumberLess = filterImplementations["number"]["less"];

		expect(filterNumberLess(1, 2)).toBe(true);
		expect(filterNumberLess(1, 1)).toBe(false);
		expect(filterNumberLess(2, 1)).toBe(false);
		expect(filterNumberLess("1", "2")).toBe(true);
		expect(filterNumberLess("1", "1")).toBe(false);
		expect(filterNumberLess("2", "1")).toBe(false);

		const filterNumberLessEqual = filterImplementations["number"]["lessEqual"];

		expect(filterNumberLessEqual(1, 2)).toBe(true);
		expect(filterNumberLessEqual(1, 1)).toBe(true);
		expect(filterNumberLessEqual(2, 1)).toBe(false);
		expect(filterNumberLessEqual("1", "2")).toBe(true);
		expect(filterNumberLessEqual("1", "1")).toBe(true);
		expect(filterNumberLessEqual("2", "1")).toBe(false);
	});
	it("can filter options", () => {
		const filterSelect = filterImplementations["select"];

		expect(
			filterSelect("test1", [
				{ checked: true, value: "test1" },
				{ checked: true, value: "test2" },
			])
		).toBe(true);
		expect(
			filterSelect("test2", [
				{ checked: true, value: "test1" },
				{ checked: true, value: "test2" },
			])
		).toBe(true);
		expect(
			filterSelect("test3", [
				{ checked: true, value: "test1" },
				{ checked: true, value: "test2" },
			])
		).toBe(false);
	});
	it("can filter dates", () => {
		const filterDateEqual = filterImplementations["date"]["equal"];

		expect(filterDateEqual("2019-01-01 01:00", "2019-01-01 01:00")).toBe(true);
		expect(filterDateEqual("2019-01-01 01:00", "2019-01-01 02:00")).toBe(false);
		expect(filterDateEqual("2019-01-01", "2019-01-01")).toBe(true);
		expect(filterDateEqual("2019-01-01", "2019-01-02")).toBe(false);

		const filterDateBefore = filterImplementations["date"]["before"];

		expect(filterDateBefore("2019-01-01 01:00", "2019-01-01 01:00")).toBe(true);
		expect(filterDateBefore("2019-01-01 01:00", "2019-01-01 02:00")).toBe(true);
		expect(filterDateBefore("2019-01-01", "2019-01-01")).toBe(true);
		expect(filterDateBefore("2019-01-01", "2019-01-02")).toBe(true);
		expect(filterDateBefore("2019-01-01 02:00", "2019-01-01 01:00")).toBe(
			false
		);
		expect(filterDateBefore("2019-01-02", "2019-01-01")).toBe(false);

		const filterDateAfter = filterImplementations["date"]["after"];

		expect(filterDateAfter("2019-01-01 01:00", "2019-01-01 01:00")).toBe(true);
		expect(filterDateAfter("2019-01-01 02:00", "2019-01-01 01:00")).toBe(true);
		expect(filterDateAfter("2019-01-01", "2019-01-01")).toBe(true);
		expect(filterDateAfter("2019-01-02", "2019-01-01")).toBe(true);
		expect(filterDateAfter("2019-01-01 01:00", "2019-01-01 02:00")).toBe(false);
		expect(filterDateAfter("2019-01-01", "2019-01-02")).toBe(false);
	});
});
