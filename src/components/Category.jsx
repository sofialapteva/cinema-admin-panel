import React, { useEffect, useState } from "react";
import { Save, Folder, Edit, Add, Delete } from "@mui/icons-material";
import { IconButton, Box, ListItem, ListItemAvatar, Avatar, Input, ListItemText, Button } from "@mui/material";
import { SubCategory } from "./SubCategory";
import { useDebounce } from "../hooks/useDebounce";

function Category({ item: { id, temp, name, subCategories }, actions }) {
  const [updatedName, setUpdatedName] = useState(name);
  const debouncedName = useDebounce(updatedName);

  const [isEdited, setIsEdited] = useState(false);
  const toggleIsEdited = () => setIsEdited(!isEdited);

  const { onRenameCategory, onDeleteCategory, onAddSubCategory } = actions;

  useEffect(() => {
    onRenameCategory(id || temp, debouncedName);
  }, [debouncedName]);

  const childActions = Object.entries(actions).reduce((acc, [key, callback]) => {
    if (typeof callback() === "function") return { ...acc, [key]: callback(id || temp) };
    return acc;
  }, {});
  const subCategoryList = subCategories.map((item) => (
    <SubCategory key={item.id || item.temp} item={item} isEdited={isEdited} actions={childActions} />
  ));
  const secondaryAction = (
    <>
      <IconButton edge="end" aria-label="delete" onClick={toggleIsEdited} title={`Сохранить категорию ${updatedName}`}>
        <Save />
      </IconButton>{" "}
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => onDeleteCategory(id || temp)}
        title={`Сохранить категорию ${updatedName}`}
      >
        <Delete />
      </IconButton>
    </>
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
        <ul>{subCategoryList}</ul>
        <Button
          variant="text"
          sx={{ color: "text.primary" }}
          endIcon={<Add />}
          onClick={() => onAddSubCategory(id || temp)}
        >
          Добавить подкатегорию
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={toggleIsEdited}
            title={`Редактировать категорию ${updatedName}`}
          >
            <Edit />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <Folder />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={updatedName} />
      </ListItem>
      <ul>{subCategoryList}</ul>
    </Box>
  );
}
export { Category };
