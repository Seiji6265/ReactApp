import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import domtoimage from "dom-to-image";

interface Props {
  item: {
    image: string;
    name: string;
    description: string;
    color: string;
  };
}

const Item: React.FC<Props> = ({ item }) => {
  const { image, name, description, color } = item;
  const id = uuidv4();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const cardElement = cardRef.current;
      domtoimage
        .toPng(cardElement)
        .then(function (dataUrl) {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "karta.png";
          link.click();
        })
        .catch(function (error) {
          console.error("Błąd podczas generowania obrazu:", error);
        });
    }
  }, []);
  return (
    <div
      key={id}
      style={{ backgroundColor: color }}
      id="stworzony"
      ref={cardRef}
    >
      {image && <img src={image} alt={name} />}
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};
export default Item;
