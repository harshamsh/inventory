import React, { useState } from "react";
import SearchBar from "./components/SearchBar";

const ItemList = () => {
  const [items, setItems] = useState([]);
  return (
    <div>
      <SearchBar items={items} setItems={setItems} />
    </div>
  );
};

export default ItemList;
