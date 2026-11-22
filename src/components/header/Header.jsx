import "./header.css";
import logo from "../../assets/img/logo.png";
import "../Button/button.css";

const Header = () => {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="logo Vinted" />
        <input type="text" placeholder="Recherche des articles " />
        <div className="connecting-btn">
          <button className="white-btn little-btn">S'inscrire</button>
          <button className="white-btn little-btn">Se connecter</button>
        </div>
        <button className="blue-btn little-btn">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
