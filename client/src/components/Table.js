import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import DeleteIcon from "@material-ui/icons/Delete";
import TableRow from "@material-ui/core/TableRow";
import { IconButton } from "@material-ui/core";
import EditItem from "./EditItem";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

function TableView({ handleDelete, items, setItems, filteredData }) {
  const classes = useStyles();
  return (
    <TableContainer
      style={{
        width: "70%",
        margin: "auto",
        overflow: "auto",
        maxHeight: "80%",
        minWidth: 650,
        border: "none",
      }}
    >
      <Table aria-label="simple table" className={classes.suggestions}>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit">
                  <EditItem item={item} items={items} setItems={setItems} />
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
    </TableContainer>
  );
}

export default TableView;
