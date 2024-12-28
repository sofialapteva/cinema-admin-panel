import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "../../App.jsx";
import * as utils from "../../utils";

describe("App", () => {
  it("renders the App component and it's subcomponents", () => {
    const { getByText } = render(<App />);
    const category = getByText("Action");
    const subCategory = getByText("Sci-Fi");
    expect(category).toBeDefined();
    expect(subCategory).toBeDefined();
  });

  it("adds a new category when the 'Добавить категорию' button is clicked", () => {
    const { getByText, getAllByText } = render(<App />);
    const addCategoryButtons = getAllByText("Добавить категорию");
    const button = addCategoryButtons[0];
    expect(button).toBeDefined();
    fireEvent.click(button);

    const newCategory = getByText("CATEGORY_3");
    expect(newCategory).toBeDefined();
  });

  it("calls formatReport with the correct state when 'Сохранить' button is clicked", () => {
    const formatReportSpy = vi.spyOn(utils, "formatReport");
    const { getAllByText } = render(<App />);

    const saveButtons = getAllByText("Сохранить");
    const button = saveButtons[0];
    expect(button).toBeDefined();
    fireEvent.click(button);

    expect(formatReportSpy).toHaveBeenCalledWith(expect.anything());
    formatReportSpy.mockRestore();
  });
});
