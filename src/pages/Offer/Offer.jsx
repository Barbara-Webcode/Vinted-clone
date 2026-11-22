import "./offer.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DNA } from "react-loader-spinner";

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
        console.log(response.data);

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
        <section className="loading">
          <DNA
            height={100}
            width={1200}
            color="#4fa94d"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
          <p>Chargement en cours...</p>
        </section>
      ) : (
        <section className="offer-container">
          <img src={data.product_image.secure_url} alt="aperçu de l'image" />
          <aside>
            <div className="offer-wrapper">
              <div className="part-top-detail">
                <h1>{data.product_price} €</h1>
                <ul>
                  {data.product_details.map((detail) => {
                    return (
                      <li key={Object.keys(detail)[0]}>
                        {Object.entries(detail).map(([key, value]) => {
                          return (
                            <div key={key} className="detail-row">
                              <span className="detail-label">{key}</span>
                              <span className="detail-value">{value}</span>
                            </div>
                          );
                        })}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="part-bottom-detail">
                <h2>{data.product_name}</h2>
                <p>{data.product_description}</p>
                <div className="owner-offer">
                  <img
                    className="avatar"
                    src={data.owner.account.avatar.secure_url}
                    alt="avatar owner"
                  />
                  <p>{data.owner.account.username}</p>
                </div>
              </div>
              <button className="big-btn blue-btn">Acheter</button>
            </div>
          </aside>
        </section>
      )}
    </main>
  );
};

export default Offer;
