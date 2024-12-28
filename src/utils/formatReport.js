import deepEqual from "deep-equal";
import { INITIAL_STATE } from "../state";

export function formatReport(categories) {
  const initialState = JSON.parse(JSON.stringify(INITIAL_STATE.categories));
  const report = { newCategories: [], updatedCategories: [], deletedCategories: [] };

  for (const category of categories) {
    const initial = initialState.find((el) => el.id === category.id);
    if (!initial) {
      const formatted = {
        name: category.name,
        subCategories: category.subCategories.map(({ name, filmIds }) => ({ name, filmIds })),
      };
      report.newCategories.push(formatted);
      continue;
    }

    if (category && initial && !deepEqual(category, initial)) {
      const formatted = {
        id: category.id,
        name: category.name,
        addedSubCategories: [],
        updatedSubCategories: [],
        deletedSubCategories: [],
      };
      for (const sub of category.subCategories) {
        const initialSub = initial.subCategories.find(
          ({ id, temp }) => sub.id === id || (!sub.id && sub.temp === temp)
        );
        if (!initialSub) formatted.addedSubCategories.push(sub);
        if (initialSub && !deepEqual(sub, initialSub)) {
          formatted.updatedSubCategories.push(sub);
        }
      }
      for (const initialSub of initial.subCategories) {
        const sub = category.subCategories.find(({ id }) => initialSub.id === id);
        if (!sub) formatted.deletedSubCategories.push(initialSub);
      }
      report.updatedCategories.push(formatted);
    }
  }

  for (const initial of initialState) {
    const current = categories.find((el) => el.id === initial.id);
    if (!current) report.deletedCategories.push({ id: initial.id });
  }

  console.log(JSON.stringify(report, null, 4));
}
