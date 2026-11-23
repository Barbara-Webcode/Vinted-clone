import "./login.css";
import LogInput from "../../components/LogInput/LogInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "../../components/Button/Button";

const Login = ({ setUserToken }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("1. submit", email, password);
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        },
      );
      console.log("2. réponse", response.data);
      // console.log(response.data);

      if (response.data.token) {
        console.log("3. token reçu");
        Cookies.set("userToken", response.data.token, { expires: 7 });

        setUserToken(response.data.token);

        navigate("/");
      }
    } catch (error) {
      console.log("ERREUR", error);
      error.response
        ? setErrorMessage(error.response.data.message)
        : setErrorMessage(error.message);
    }
  };
  return (
    <main className="main-connecting">
      <div className="connecting-container">
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
          <LogInput
            value={email}
            setValue={setEmail}
            type="email"
            placeholder="Adresse email"
            id="email"
          />
          <LogInput
            value={password}
            setValue={setPassword}
            type="password"
            placeholder="Mot de passe"
            id="password"
          />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <Button text="Se connecter" className="big-btn blue-btn" />
        </form>
        <Link to="/signup" className="msg-inscription">
          Pas encore de compte ? Inscris-toi !
        </Link>
      </div>
    </main>
  );
};

export default Login;
