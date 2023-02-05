import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
}));

const EditItem = ({ item, items, setItems, fetchItems }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    if (!name || !description) {
      alert("Please fill all details.");
      return;
    }
    axios
      .put(`http://localhost:5000/api/items/${item._id}`, {
        name,
        description,
      })
      .then((response) => {
        setItems(
          items.map((currentItem) => {
            if (currentItem._id === response.data._id) {
              return response.data;
            }
            return currentItem;
          })
        );
      })
      //   .then(() => fetchItems())
      .then(() => closeEditModal())
      .catch((error) => console.error(error));
  };
  const classes = useStyles();
  return (
    <div>
      <EditIcon onClick={openEditModal} />
      <Dialog open={isEditModalOpen} onClose={closeEditModal}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEdit} className={classes.form}>
            <TextField
              id="name"
              label="Item Name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="Item Name"
            />
            <TextField
              id="description"
              label="Item Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              placeholder="Item Description"
              multiline
              rows={4}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal}>Cancel</Button>
          <Button type="submit" onClick={handleEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditItem;
