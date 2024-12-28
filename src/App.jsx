import React, { useReducer } from "react";
import { Add, Save } from "@mui/icons-material";
import { Box, Button, Container } from "@mui/material";
import { Category } from "./components";
import { getActions, INITIAL_STATE, categoryReducer } from "./state";
import { formatReport } from "./utils";

export default function App() {
  const [state, dispatch] = useReducer(categoryReducer, INITIAL_STATE.categories);
  const { onAddCategory } = getActions(dispatch);
  const categoryList = state.map((item) => <Category key={item.id || item.temp} item={item} dispatch={dispatch} />);

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
