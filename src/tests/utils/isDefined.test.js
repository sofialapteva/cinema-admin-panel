import { describe, it, expect } from "vitest";
import { isDefined } from "../../utils";

describe("isDefined", () => {
  it("should return true for a single defined value", () => {
    expect(isDefined("string")).toBeTruthy();
  });
  it("should return true for a multiple defined values", () => {
    expect(isDefined("string1", "string2")).toBeTruthy();
  });
  it("should return false for a single undefined or null value", () => {
    expect(isDefined(undefined)).toBeFalsy();
  });
  it("should return false for a multiple undefined or null values", () => {
    expect(isDefined(undefined, null)).toBeFalsy();
  });
  it("should return false for a mix of undefined or null values and defined values", () => {
    expect(isDefined(undefined, "string", null)).toBeFalsy();
  });
});
