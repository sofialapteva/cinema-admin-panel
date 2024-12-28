import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useDebounce } from "../../hooks/useDebounce";

describe("useDebounce", () => {
  it("should return initial value", () => {
    const { result } = renderHook(() => useDebounce("string"));
    expect(result.current).toEqual("string");
  });
});
