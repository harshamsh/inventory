import React, { useState, useEffect } from "react";
import axios from "axios";

const Item = ({ item, items, setItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState({
    name: item.name,
    description: item.description,
  });

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/items/${item._id}`, editItem)
      .then((res) => {
        const updatedItems = items.map((i) =>
          i._id === item._id ? res.data : i
        );
        setItems(updatedItems);
        setIsModalOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/items/${item._id}`)
      .then((res) => {
        const updatedItems = items.filter((i) => i._id !== item._id);
        setItems(updatedItems);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={itemBoxStyles}>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <button onClick={() => setIsModalOpen(true)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      {isModalOpen && (
        <form style={modalStyles}>
          <input
            type="text"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
          <textarea
            value={editItem.description}
            onChange={(e) =>
              setEditItem({ ...editItem, description: e.target.value })
            }
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

const itemBoxStyles = {
  backgroundColor: "#f2f2f2",
  padding: "20px",
  margin: "20px",
};

const modalStyles = {
  backgroundColor: "white",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "20px",
};

export default Item;
