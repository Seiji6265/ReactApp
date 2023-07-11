import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

interface FormProps {
  onAddItem: (newItem: Item) => void;
}

interface Item {
  name: string;
  description: string;
  color: string;
  image: string;
}

const Form: React.FC<FormProps> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (cardRef.current) {
      const cardElement = cardRef.current;
      html2canvas(cardElement).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "karta.png";
        link.click();
      });
    }
  };

  return (
    <div id="formularz">
      <input
        type="text"
        placeholder="Nazwa"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Kolor tła"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="button" onClick={handleDownload}>
        Pobierz
      </button>
      <div
        className="card"
        style={{ backgroundColor: color }}
        id="stworzony"
        ref={cardRef}
      >
        {previewImage && <img src={previewImage} alt={name} />}
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Form;
