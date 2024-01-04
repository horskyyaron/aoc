import { expect, test } from "vitest";
import { calcRowCalibration, getFirstDig } from "./main";

test("yaron2 first dig from left is 2", () => {
  expect(getFirstDig("yaron2")).toBe(2)
});

test("2yaron first dig from left is 2", () => {
  expect(getFirstDig("2yaron")).toBe(2)
});

test("yaron2djdgdg8 first dig from left is 2", () => {
  expect(getFirstDig("yaron2djdgdg8")).toBe(2);
});

test("no digits in sting", () => {
  expect(getFirstDig("yaron")).toBe(-1);
});

test("ya2ron59 calibration is 29", () => {
  expect(calcRowCalibration("ya2ron59")).toBe(29);
});

test("ya2ron calibration is 22", () => {
  expect(calcRowCalibration("ya2ron")).toBe(22);
});
