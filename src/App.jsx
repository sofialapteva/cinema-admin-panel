import React, { useReducer } from "react";
import { Box, Button, Container } from "@mui/material";
import { Add, Save } from "@mui/icons-material";
import { Category } from "./components";
import { CATEGORY_TEMPLATE, INITIAL_STATE, SUBCATEGORY_TEMPLATE } from "./state";
import deepEqual from "deep-equal";

function reducer(categories, action) {
  switch (action.type) {
    case "add-category": {
      return [
        {
          ...CATEGORY_TEMPLATE,
          name: `CATEGORY_${categories.length + 1}`,
          temp: `CATEGORY_${categories.length + 1}_${Date.now()}`,
        },
        ...categories,
      ];
    }
    case "rename-category": {
      return categories.map((category) => {
        if (category.id !== action.category && category.temp !== action.category) return category;
        if (category.name === action.newName) return category;
        const updatedCategory = { ...category, name: action.newName };
        return updatedCategory;
      });
    }
    case "delete-category": {
      return categories.filter((category) => category.id !== action.category && category.temp !== action.category);
    }
    case "add-subcategory": {
      return categories.map((category) => {
        if (category.id !== action.category && category.temp !== action.category) return category;
        return {
          ...category,
          subCategories: [
            {
              ...SUBCATEGORY_TEMPLATE,
              name: `SUBCATEGORY_${category.subCategories.length + 1}`,
              temp: `SUBCATEGORY_${category.subCategories.length + 1}_${Date.now()}`,
            },
            ...category.subCategories,
          ],
        };
      });
    }
    case "rename-subcategory": {
      return categories.map((category) => {
        if (category.id !== action.category && category.temp !== action.category) return category;
        return {
          ...category,
          subCategories: category.subCategories.map((sub) => {
            if (sub.id !== action.sub && sub.temp !== action.sub) return sub;
            if (sub.name === action.newName) return sub;
            return { ...sub, name: action.newName };
          }),
        };
      });
    }
    case "delete-subcategory": {
      return categories.map((category) => {
        if (category.id !== action.category && category.temp !== action.category) return category;
        return {
          ...category,
          subCategories: category.subCategories.filter(({ id, temp }) => id !== action.sub && temp !== action.sub),
        };
      });
    }
    case "add-film":
    case "delete-film": {
      return categories.map((category) => {
        if (category.id !== action.category && category.temp !== action.category) return category;
        return {
          ...category,
          subCategories: category.subCategories.map((sub) => {
            if (sub.id !== action.sub && sub.temp !== action.sub) return sub;
            if (action.type === "add-film") return { ...sub, filmIds: sub.filmIds.concat(action.film) };
            if (action.type === "delete-film")
              return { ...sub, filmIds: sub.filmIds.filter((id) => id !== action.film) };
          }),
        };
      });
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const isDefined = (...args) => !args.some((arg) => arg === undefined || arg === null);

function formatReport(categories) {
  const initialState = JSON.parse(JSON.stringify(INITIAL_STATE.categories));
  const report = { newCategories: [], updatedCategories: [], deletedCategories: [] };

  for (const category of categories) {
    const initial = initialState.find((el) => el.id === category.id);
    if (!initial) {
      report.newCategories.push(category);
      continue;
    }

    if (category && initial && !deepEqual(category, initial)) {
      report.updatedCategories.push(category);
    }
  }

  for (const initial of initialState) {
    const current = categories.find((el) => el.id === initial.id);
    if (!current) report.deletedCategories.push(initial);
  }

  console.log(JSON.stringify(report, null, 4));
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE.categories);

  const onAddCategory = () => dispatch({ type: "add-category" });
  const onRenameCategory = (category, newName) =>
    isDefined(category, newName) && dispatch({ category, newName, type: "rename-category" });
  const onDeleteCategory = (category) => isDefined(category) && dispatch({ category, type: "delete-category" });
  const onAddSubCategory = (category) => isDefined(category) && dispatch({ category, type: "add-subcategory" });
  const onDeleteSubCategory = (category) => (sub) =>
    isDefined(category, sub) && dispatch({ category, sub, type: "delete-subcategory" });
  const onRenameSubCategory = (category) => (sub, newName) =>
    isDefined(category, sub, newName) && dispatch({ category, sub, newName, type: "rename-subcategory" });
  const onAddFilm = (category) => (sub) => (film) =>
    isDefined(category, sub, film) && dispatch({ category, sub, film, type: "add-film" });
  const onDeleteFilm = (category) => (sub) => (film) =>
    isDefined(category, sub, film) && dispatch({ category, sub, film, type: "delete-film" });
  const actions = {
    onRenameCategory,
    onDeleteCategory,
    onAddSubCategory,
    onRenameSubCategory,
    onDeleteSubCategory,
    onAddFilm,
    onDeleteFilm,
  };
  const categoryList = state.map((item) => <Category key={item.id || item.temp} item={item} actions={actions} />);

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button variant="text" sx={{ color: "text.primary" }} endIcon={<Add />} onClick={onAddCategory}>
          Добавить категорию
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "text.primary" }}
          endIcon={<Save />}
          onClick={() => formatReport(state)}
        >
          Сохранить
        </Button>
      </Box>
      <Box>{categoryList}</Box>
    </Container>
  );
}
