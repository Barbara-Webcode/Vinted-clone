import "./header.css";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Cookies from "js-cookie";
import { IoSearchSharp } from "react-icons/io5";

const Header = ({
  userToken,
  setUserToken,
  title,
  setTitle,
  priceMin,
  priceMax,
  setPriceMin,
  setPriceMax,
}) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo Vinted" />
        </Link>

        <div className="filter">
          <div className="header-icon">
            <div className="icon">
              <IoSearchSharp />
            </div>
            <input
              type="text"
              placeholder="Recherche des articles "
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>

          <div className="price-filter">
            <label htmlFor="priceMin">Prix minimum</label>
            <input
              type="number"
              id="priceMin"
              value={priceMin}
              onChange={(event) => {
                setPriceMin(event.target.value);
              }}
            />
            <label htmlFor="priceMax">Prix maximum</label>
            <input
              type="number"
              id="priceMax"
              value={priceMax}
              onChange={(event) => {
                setPriceMax(event.target.value);
              }}
            />
          </div>
        </div>

        <div className="connecting-buttons">
          {userToken ? (
            <Button
              active={() => {
                Cookies.remove("userToken");
                setUserToken(null);
                navigate("/login");
              }}
              text="Se déconnecter"
              className="little-btn red-btn"
            />
          ) : (
            <div className="connecting-btn">
              <Link to="/signup">
                <Button className="little-btn white-btn" text="S'inscrire" />
              </Link>
              <Link to="/login">
                <Button className="little-btn white-btn" text="Se connecter" />
              </Link>
            </div>
          )}
          <Button className="blue-btn little-btn" text="Vends tes articles" />
        </div>
      </div>
    </header>
  );
};

export default Header;
