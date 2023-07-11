import React, { useState } from "react";
import Form from "./components/Form";
import Item from "./components/Item";

interface ItemType {
  image: string;
  name: string;
  description: string;
  color: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>([]);

  const handleAddItem = (newItem: ItemType) => {
    setItems([...items, newItem]);
  };

  return (
    <div className="container">
      <h1>Pokemon Center</h1>
      <Form onAddItem={handleAddItem} />
      {items.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
};

export default App;
