import "./header.css";
import logo from "../../assets/img/logo.png";

const Header = () => {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="logo Vinted" />
        <input type="text" placeholder="Recherche des articles " />
        <div className="connecting-btn">
          <button>S'inscrire</button>
          <button>Se connecter</button>
        </div>
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
