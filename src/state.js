import { isDefined } from "./utils";

export const SUBCATEGORY_TEMPLATE = {
  id: null,
  temp: null,
  name: "SUBCATEGORY",
  filmIds: [],
};

export const CATEGORY_TEMPLATE = {
  id: null,
  temp: null,
  name: "CATEGORY",
  subCategories: [],
};

export const INITIAL_STATE = {
  films: [
    {
      id: 1,
      name: "The Matrix",
    },
    {
      id: 2,
      name: "Inception",
    },
    {
      id: 3,
      name: "Interstellar",
    },
    {
      id: 4,
      name: "The Dark Knight",
    },
    {
      id: 5,
      name: "Pulp Fiction",
    },
  ],
  categories: [
    {
      id: 1,
      name: "Action",
      subCategories: [
        {
          id: 101,
          name: "Sci-Fi",
          filmIds: [1, 2, 3],
        },
        {
          id: 102,
          name: "Superheroes",
          filmIds: [1, 2, 4],
        },
      ],
    },
    {
      id: 2,
      name: "Drama",
      subCategories: [
        {
          id: 201,
          name: "Historical",
          filmIds: [1, 3, 5],
        },
        {
          id: 202,
          name: "Romance",
          filmIds: [2, 3, 5],
        },
      ],
    },
  ],
};

export function getActions(dispatch) {
  const onAddCategory = () => dispatch({ type: "add-category" });
  const onRenameCategory = (category, newName) => dispatch({ category, newName, type: "rename-category" });
  const onDeleteCategory = (category) => dispatch({ category, type: "delete-category" });
  const onAddSubCategory = (category) => dispatch({ category, type: "add-subcategory" });
  const onDeleteSubCategory = (category, sub) => dispatch({ category, sub, type: "delete-subcategory" });
  const onRenameSubCategory = (category, sub, newName) =>
    dispatch({ category, sub, newName, type: "rename-subcategory" });
  const onAddFilm = (category, sub, film) => dispatch({ category, sub, film, type: "add-film" });
  const onDelete = (category, sub, film) => dispatch({ category, sub, film, type: "delete-film" });

  return {
    onAddCategory,
    onRenameCategory,
    onDeleteCategory,
    onAddSubCategory,
    onDeleteSubCategory,
    onRenameSubCategory,
    onAddFilm,
    onDelete,
  };
}

export function categoryReducer(categories, action) {
  console.log(action);
  if (!isDefined(...Object.values(action))) return;
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
