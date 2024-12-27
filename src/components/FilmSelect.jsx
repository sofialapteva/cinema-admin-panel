import React, { useState } from "react";
import { Save, Cancel, Check } from "@mui/icons-material";
import { MenuItem, Box, FormControl, InputLabel, Select, IconButton, Alert } from "@mui/material";
import { INITIAL_STATE } from "../state";

function FilmSelect({ onSave, onCancel, filmIds }) {
  const [value, setValue] = useState("");
  const filmOptions = INITIAL_STATE.films
    .filter(({ id }) => !filmIds.includes(id))
    .map(({ id, name }) => (
      <MenuItem key={id} value={id}>
        {name}
      </MenuItem>
    ));
  if (filmOptions.length === 0) {
    return (
      <Alert icon={<Check fontSize="inherit" />} severity="info" sx={{ my: 1 }}>
        Все доступные фильмы уже добавлены в подкатегорию
      </Alert>
    );
  }
  const styles = { display: "flex", justifyContent: "stretch", alignItems: "end", px: 2, mb: 2 };

  return (
    <Box sx={styles}>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputLabel>Выберите фильм</InputLabel>
        <Select value={value} onChange={(e) => setValue(e.target.value)}>
          {filmOptions}
        </Select>
      </FormControl>
      <IconButton edge="end" aria-label="delete" onClick={() => onSave(value)} title="Сохранить фильм">
        <Save />
      </IconButton>
      <IconButton edge="end" aria-label="delete" onClick={onCancel} title="Отменить добавление">
        <Cancel />
      </IconButton>
    </Box>
  );
}

export { FilmSelect };
