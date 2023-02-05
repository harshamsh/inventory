import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Trademark from "./components/Trademark";

const ItemList = () => {
  const [items, setItems] = useState([]);
  return (
    <div>
      <SearchBar items={items} setItems={setItems} />
      <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
        <Trademark />
      </div>
    </div>
  );
};

export default ItemList;
