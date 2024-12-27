import React, { useEffect, useState } from "react";
import { Delete, Add, Folder } from "@mui/icons-material";
import { IconButton, Button, Box, ListItem, ListItemAvatar, Avatar, Input, ListItemText } from "@mui/material";
import { Film } from "./Film";
import { FilmSelect } from "./FilmSelect";
import { useDebounce } from "../hooks/useDebounce";

function SubCategory({ item: { name, id, filmIds, temp }, isEdited, actions }) {
  const [updatedName, setUpdatedName] = useState(name);
  const debouncedName = useDebounce(updatedName);

  const [isAdding, setIsAdding] = useState(false);
  const toggleAddition = () => setIsAdding(!isAdding);

  const { onRenameSubCategory, onDeleteSubCategory } = actions;
  useEffect(() => {
    onRenameSubCategory(id || temp, debouncedName);
  }, [debouncedName]);

  const childActions = Object.entries(actions).reduce((acc, [key, callback]) => {
    if (typeof callback() === "function") return { ...acc, [key]: callback(id || temp) };
    return acc;
  }, {});
  const filmList = filmIds.map((id) => <Film id={id} key={id} isEdited={isEdited} actions={childActions} />);

  const secondaryAction = (
    <IconButton
      edge="end"
      aria-label="delete"
      onClick={() => onDeleteSubCategory(id || temp)}
      title={`Удалить подкатегорию ${name}`}
    >
      <Delete />
    </IconButton>
  );

  const onSave = (film) => {
    childActions.onAddFilm(film);
    toggleAddition();
  };
  const filmAdditionHandler = isAdding ? (
    <FilmSelect onCancel={toggleAddition} onSave={onSave} filmIds={filmIds} />
  ) : (
    <Button variant="text" sx={{ color: "text.primary" }} endIcon={<Add />} onClick={toggleAddition}>
      Добавить фильм
    </Button>
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
