import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

// Styles for the form
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

// AddItem component to add a new item to inventory
const AddItem = ({ items, setItems }) => {
  // State for handling the open and close of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for storing the item name, description, and quantity
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle the form submission and adding a new item to the inventory
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !description) {
      alert("Please fill all details.");
      return;
    }
    axios
      .post("http://localhost:5000/api/items/", {
        name,
        description,
        quantity,
      })
      .then((response) => {
        // Clear the form fields after successful submission
        setName("");
        setDescription("");
        setQuantity("");
        setItems([...items, response.data]);
      })
      .then(closeModal()) // Close the modal
      .catch((error) => console.error(error));
  };

  // Apply the styles to the form
  const classes = useStyles();

  return (
    <div>
      {/* Add Item button to open the modal */}
      <Button variant="outlined" color="primary" onClick={openModal}>
        Add Item
      </Button>
      <Dialog open={isModalOpen} onClose={closeModal}>
        {/* Modal header */}
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          {/* Form to add a new item */}
          <form className={classes.form} onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            onClick={handleSubmit}
            onSubmit={closeModal}
            color="primary"
          >
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddItem;
