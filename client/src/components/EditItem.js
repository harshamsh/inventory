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
  // State to keep track of whether the edit modal is open or closed
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // State to store the values of the item's name, description and quantity
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [quantity, setQuantity] = useState(item.quantity);

  // Function to open the edit modal
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Function to handle the edit action
  const handleEdit = (event) => {
    event.preventDefault();
    // Check if the required fields have been filled
    if (!name || !description || !quantity) {
      alert("Please fill all details.");
      return;
    }
    // Make a PUT request to the API to update the item
    axios
      .put(`http://localhost:5000/api/items/${item._id}`, {
        name,
        description,
        quantity,
      })
      .then((response) => {
        // Update the items state with the updated item from the response
        setItems(
          items.map((currentItem) => {
            if (currentItem._id === response.data._id) {
              return response.data;
            }
            return currentItem;
          })
        );
      })
      // Close the modal
      .then(() => closeEditModal())
      // Log any error
      .catch((error) => console.error(error));
  };
  const classes = useStyles();
  return (
    <div>
      {/* Render the edit icon and bind the openEditModal function to its onClick event */}
      <EditIcon onClick={openEditModal} />
      {/* Render the edit modal */}
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
            />
            <TextField
              id="quantity"
              label="Item Quantity"
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              required
              placeholder="Item Quantity"
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
