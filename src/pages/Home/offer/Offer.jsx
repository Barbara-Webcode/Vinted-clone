import "./offer.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`,
        );
        // console.log(response.data); ok
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);
  return (
    <main className="offer">
      {isLoading ? (
        <p>Chargement en cours</p>
      ) : (
        <>
          <img src={data.product_image.secure_url} alt="aperçu de l'image" />
          <aside>
            <p>{data.product_price} €</p>
            <button>Acheter</button>
          </aside>
        </>
      )}
    </main>
  );
};

export default Offer;
