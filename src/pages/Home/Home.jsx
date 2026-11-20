import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <main className="home">
      <div className="container">
        {isLoading ? (
          <p>Chargment en cours</p>
        ) : (
          <section>
            {data.offers.map((offer) => {
              return (
                <article>
                  <div className="owner">
                    <img
                      className="avatar"
                      src={offer.owner.account.avatar.secure_url}
                      alt="avatar owner"
                    />
                    <p>{offer.owner.account.username}</p>
                  </div>
                  <Link to={`/offer/${offer._id}`}>
                    {console.log(offer._id)}
                    <img
                      className="article-img"
                      src={offer.product_image.secure_url}
                      alt="picture acticle"
                    />
                    <div className="price">
                      <p>{offer.product_price} €</p>
                      <p></p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
};

export default Home;
