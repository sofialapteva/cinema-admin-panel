import React from "react";
import { Delete, Theaters } from "@mui/icons-material";
import { IconButton, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { INITIAL_STATE } from "../state";

function Film({ id, isEdited, onDelete }) {
  const film = INITIAL_STATE.films.find((el) => el.id === id);
  if (!film) return;
  const secondaryAction = isEdited ? (
    <IconButton edge="end" aria-label="delete" onClick={() => onDelete(id)} title={`Удалить фильм ${film.name}`}>
      <Delete />
    </IconButton>
  ) : null;

  return (
    <ListItem secondaryAction={secondaryAction}>
      <ListItemAvatar>
        <Avatar>
          <Theaters />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={film.name} />
    </ListItem>
  );
}

export { Film };
