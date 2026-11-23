import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import Hero from "../Hero/Hero";

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers",
        );
        // console.log(response.data); ok
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Hero />

      <main className="home">
        <div className="container">
          {isLoading ? (
            <section className="loading">
              <DNA
                height={100}
                width={1200}
                visible={true}
                ariaLabel="oval-loading"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
              <p>Chargement en cours...</p>
            </section>
          ) : (
            <section>
              {data.offers.map((offer) => {
                return (
                  <article key={offer._id}>
                    <div className="owner">
                      {offer.owner.account.avatar && (
                        <img
                          className="avatar"
                          src={offer.owner.account.avatar.secure_url}
                          alt="avatar owner"
                        />
                      )}
                      <p>{offer.owner.account.username}</p>
                    </div>
                    <Link to={`/offer/${offer._id}`} className="offers">
                      {offer.product_image?.secure_url && (
                        <img
                          className="article-img"
                          src={offer.product_image.secure_url}
                          alt="Aperçu de l'offre"
                        />
                      )}

                      <div className="price">
                        <p>{offer.product_price} €</p>
                        {offer.product_details.map((details, index) => {
                          return (
                            details.TAILLE && (
                              <p key={details.TAILLE + index}>
                                {details.TAILLE}
                              </p>
                            )
                          );
                        })}

                        {offer.product_details.map((details, index) => {
                          return (
                            details.MARQUE && (
                              <p key={details.MARQUE + index}>
                                {details.MARQUE}
                              </p>
                            )
                          );
                        })}
                      </div>
                    </Link>
                  </article>
                );
              })}
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
