import React from "react";
import { Delete, Theaters } from "@mui/icons-material";
import { IconButton, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { INITIAL_STATE } from "../state";

function Film({ id, isEdited, actions: { onDeleteFilm } }) {
  const film = INITIAL_STATE.films.find((el) => el.id === id);
  if (!film) return;
  const secondaryAction = (
    <IconButton edge="end" aria-label="delete" onClick={() => onDeleteFilm(id)} title={`Удалить фильм ${film.name}`}>
      <Delete />
    </IconButton>
  );

  if (isEdited) {
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
  return (
    <ListItem>
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
