import React, { useState } from "react";
// import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import DeleteIcon from "@material-ui/icons/Delete";
// // import EditIcon from "@material-ui/icons/Edit";
// import IconButton from "@material-ui/core/IconButton";
// import AddItem from "./components/AddItem";
// import EditItem from "./components/EditItem";
import SearchBar from "./components/SearchBar";

// const useStyles = makeStyles((theme) => ({
//   table: {
//     width: "60%",
//     borderCollapse: "collapse",
//     margin: "auto",
//     overflow: "scroll",
//     maxHeight: "400px",
//     minWidth: 650,
//   },
//   tableHead: {
//     backgroundColor: theme.palette.primary.light,
//     color: theme.palette.common.white,
//   },
//   tableRow: {
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
// }));

const ItemList = () => {
  const [items, setItems] = useState([]);
  return (
    <div>
      <SearchBar items={items} setItems={setItems} />
      {/* 
      <TableContainer style={{ alignItems: "center" }}>
        <Table
          component={Paper}
          className={classes.table}
          aria-label="inventory table"
        >
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item._id}
                className={classes.tableRow}
                style={{ height: "10px" }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.description}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="edit">
                    <EditItem
                      item={item}
                      items={items}
                      setItems={setItems}
                      fetchItems={fetchItems}
                    />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
};

export default ItemList;
