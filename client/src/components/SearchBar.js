import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import DeleteIcon from "@material-ui/icons/Delete";
// import TableRow from "@material-ui/core/TableRow";
// import { IconButton } from "@material-ui/core";
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddItem from "./AddItem";
// import EditItem from "./EditItem";
import TableView from "./Table";

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

function SearchBar() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((response) => {
        setItems(response.data);
        if (!searchTerm) {
          setFilteredData(response.data);
        }
      })

      .catch((error) => console.error(error));
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
    const filteredData = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (e.target.value) {
      setFilteredData(filteredData);
    }
  };

  const handleDelete = async (item) => {
    await axios.delete(`http://localhost:5000/api/items/` + item._id);
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
