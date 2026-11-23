import "./header.css";
import logo from "../../assets/img/logo.png";
import "../Button/button.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Cookies from "js-cookie";
import { IoSearchSharp } from "react-icons/io5";

const Header = ({ userToken, setUserToken }) => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo Vinted" />
        </Link>
        <div className="header-icon">
          <div className="icon">
            <IoSearchSharp />
          </div>
          <input type="text" placeholder="Recherche des articles " />
        </div>

        <div className="connecting-buttons">
          {userToken ? (
            <Button
              active={() => {
                Cookies.remove("userToken");
                setUserToken(null);
              }}
              text="Se déconnecter"
              className="little-btn red-button"
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
