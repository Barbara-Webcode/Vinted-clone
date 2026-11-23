import "./header.css";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Cookies from "js-cookie";
import { IoSearchSharp } from "react-icons/io5";
import { Range } from "react-range";
import { useState } from "react";

const Header = ({ userToken, setUserToken }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState([50, 100]);

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
            <input type="text" placeholder="Recherche des articles " />
          </div>

          <div className="price-filter">
            <span>Prix entre :</span>
            <Range
              label="Select your value"
              step={1}
              min={0}
              max={1000}
              values={values}
              onChange={(values) => {
                console.log(values);
                return setValues(values);
              }}
              renderTrack={({ props, children }) => {
                console.log(props, children);
                return (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "2px",
                      width: "250px",
                      backgroundColor: "#007782",
                    }}>
                    {children}
                  </div>
                );
              }}
              renderThumb={({ props }) => {
                // console.log(props);
                return (
                  <>
                    <div
                      {...props}
                      key={props.key}
                      style={{
                        ...props.style,
                        height: "10px",
                        width: "10px",
                        backgroundColor: "teal",
                        borderRadius: "50%",
                      }}>
                      <p className="tag">{values[props.key]}€</p>
                    </div>
                  </>
                );
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
