import { describe, it, expect, beforeEach } from "vitest";
import { categoryReducer } from "../../state";

let MOCK_STATE;

describe("categoryReducer", () => {
  beforeEach(() => {
    MOCK_STATE = [];
  });
  it("should return undefined if the action hold undefined field", () => {
    expect(categoryReducer(MOCK_STATE, { category: undefined })).toBeUndefined();
  });

  it("should return state with new category on 'add-category' action call", () => {
    const updatedState = categoryReducer(MOCK_STATE, { type: "add-category" });
    const newCategory = updatedState[0];
    expect(newCategory).toBeDefined();
    expect(newCategory.name).toEqual(`CATEGORY_${updatedState.length}`);
  });

  it("should return state with new category on 'add-category' action call", () => {
    const initial = categoryReducer(MOCK_STATE, { type: "add-category" });
    const category = initial[0];

    const newName = "NEW_NAME_1";
    const updatedState = categoryReducer(initial, {
      type: "rename-category",
      category: category.temp,
      newName,
    });

    const updatedCategory = updatedState[0];
    expect(updatedCategory).toBeDefined();
    expect(updatedCategory.name).toEqual(newName);
  });
});
