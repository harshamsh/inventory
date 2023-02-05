import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "3rem",
    fontSize: ".8rem",
    backgroundColor: "#e0e0e0",
    color: "#333",
  },
}));

const Trademark = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <p>A creation of Sri Harsha Musunuru for Neirfeno</p>
    </footer>
  );
};

export default Trademark;
