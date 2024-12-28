import React, { useEffect, useState } from "react";
import { Delete, Add, Folder } from "@mui/icons-material";
import { IconButton, Button, Box, ListItem, ListItemAvatar, Avatar, Input, ListItemText } from "@mui/material";
import { Film } from "./Film";
import { FilmSelect } from "./FilmSelect";
import { useDebounce } from "../hooks/useDebounce";
import { getActions } from "../state";

function SubCategory({ item: { name, id, filmIds, temp }, category, isEdited, dispatch }) {
  const [updatedName, setUpdatedName] = useState(name);
  const debouncedName = useDebounce(updatedName);

  const [isAdding, setIsAdding] = useState(false);
  const toggleAddition = () => setIsAdding(!isAdding);

  const { onDeleteSubCategory, onRenameSubCategory, onAddFilm, onDelete } = getActions(dispatch);

  useEffect(() => {
    onRenameSubCategory(category, id || temp, debouncedName);
  }, [debouncedName]);

  const filmList = filmIds.map((filmId) => (
    <Film id={filmId} key={filmId} isEdited={isEdited} onDelete={(film) => onDelete(category, id || temp, film)} />
  ));

  const onSave = (film) => {
    onAddFilm(category, id || temp, film);
    toggleAddition();
  };

  const filmAdditionHandler = isAdding ? (
    <FilmSelect onCancel={toggleAddition} onSave={onSave} filmIds={filmIds} />
  ) : (
    <Button variant="text" sx={{ color: "text.primary" }} endIcon={<Add />} onClick={toggleAddition}>
      Добавить фильм
    </Button>
  );

  const secondaryAction = (
    <IconButton
      edge="end"
      aria-label="delete"
      onClick={() => onDeleteSubCategory(category, id || temp)}
      title={`Удалить подкатегорию ${name}`}
    >
      <Delete />
    </IconButton>
  );

  if (isEdited) {
    return (
      <Box>
        <ListItem secondaryAction={secondaryAction}>
          <ListItemAvatar>
            <Avatar>
              <Folder />
            </Avatar>
          </ListItemAvatar>
          <Input value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
        </ListItem>
        <ul>
          {filmList}
          {filmAdditionHandler}
        </ul>
      </Box>
    );
  }
  return (
    <Box>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Folder />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} />
      </ListItem>
      <ul>{filmList}</ul>
    </Box>
  );
}

export { SubCategory };
