import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddItem from "./AddItem";
import TableView from "./Table";

// Define styles for the component using Material UI's `makeStyles` hook
const useStyles = makeStyles({
  root: {
    width: "100%",
    textAlign: "center",
    marginTop: "40px",
  },
  serachbar: {
    width: "60%",
    borderCollapse: "collapse",
  },
  suggestions: {
    width: "70%",
    borderCollapse: "collapse",
    margin: "auto",
  },
});

// SearchBar component definition
function SearchBar() {
  // Use the styles hook to get access to the defined styles
  const classes = useStyles();

  // Define state variables
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [items, setItems] = useState([]);

  // Use `useEffect` hook to fetch items data from the API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((response) => {
        // Set the items data in state
        setItems(response.data);
        // If the searchTerm is empty, set the filtered data to the items data
        if (!searchTerm) {
          setFilteredData(response.data);
        }
      })
      .catch((error) => console.error(error)); // Log any errors
  });

  // Handle the changes in the search input field
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Filter the items based on the search term
    const filteredData = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // If the search term is not empty, set the filtered data in state
    if (e.target.value) {
      setFilteredData(filteredData);
    }
  };

  // Handle delete operation
  const handleDelete = async (item) => {
    // Make a DELETE request to the API to delete the item
    await axios.delete(`http://localhost:5000/api/items/` + item._id);
    // Filter the items state to exclude the deleted item
    setItems(items.filter((i) => i._id !== item._id));
    setFilteredData(filteredData.filter((i) => i._id !== item._id));
  };
  return (
    <div className={classes.root}>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <TextField
          className={classes.serachbar}
          label="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <AddItem items={items} setItems={setItems} />
      </div>
      <TableView
        handleDelete={handleDelete}
        items={items}
        setItems={setItems}
        filteredData={filteredData}
      />
    </div>
  );
}

export default SearchBar;
