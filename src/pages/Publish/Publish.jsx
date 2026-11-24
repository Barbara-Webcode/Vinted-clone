import "./publish.css";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Button from "../../components/Button/Button";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Publish = ({ userToken }) => {
  const navigate = useNavigate();

  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  return userToken ? (
    <main className="publish">
      <div className="container">
        <h1>Vends ton article</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const formData = new FormData();
            // récupérer les infos des states pour créer les clefs via .append()
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("condition", condition);
            formData.append("city", city);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("picture", picture);

            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
                formData,
                {
                  headers: {
                    authorization: "Bearer " + userToken,
                  },
                },
              );

              navigate(`/offer/${response.data._id}`);
            } catch (error) {
              console.log(error.message);
            }
          }}>
          <section className="file">
            {preview ? (
              <img src={preview} alt="aperçu de l'image" />
            ) : (
              <div>
                <label htmlFor="picture">
                  <FiPlus />
                  Ajoute une photo
                </label>

                <input
                  type="file"
                  id="picture"
                  onChange={(event) => {
                    const objectUrl = URL.createObjectURL(
                      event.target.files[0],
                    );
                    setPreview(objectUrl);
                    setPicture(event.target.files[0]);
                  }}
                />
              </div>
            )}
          </section>
          <section>
            <div>
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                id="title"
                placeholder="ex : Chemise Sézane verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                value={title}
              />
            </div>
            <div>
              <label htmlFor="description">Décris ton article</label>
              <input
                type="text"
                id="description"
                placeholder="ex : porté quelquefois, taille correctement"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                value={description}
              />
            </div>
          </section>
          <section>
            <div>
              <label htmlFor="brand">Marque</label>
              <input
                type="text"
                id="brand"
                placeholder="ex : Zara"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
                value={brand}
              />
            </div>
            <div>
              <label htmlFor="size">Taille</label>
              <input
                type="text"
                id="size"
                placeholder="ex : L / 40 / 12"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
                value={size}
              />
            </div>
            <div>
              <label htmlFor="color">Couleur</label>
              <input
                type="text"
                id="color"
                placeholder="ex : Fuchsia"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
                value={color}
              />
            </div>
            <div>
              <label htmlFor="condition">Etat</label>
              <input
                type="text"
                id="condition"
                placeholder="ex : Neuf avec etiquette"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
                value={condition}
              />
            </div>
            <div>
              <label htmlFor="city">Lieu</label>
              <input
                type="text"
                id="city"
                placeholder="ex : Paris"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                value={city}
              />
            </div>
          </section>
          <section>
            <div>
              <label htmlFor="price">Prix</label>
              <input
                type="number"
                id="price"
                placeholder="0,00 €"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
                value={price}
              />
            </div>
          </section>
          <Button className="little-button blue-button" text="Ajouter" />
        </form>
      </div>
    </main>
  ) : (
    <Navigate to="/login" state={{ from: "/publish" }} />
  );
};

export default Publish;
