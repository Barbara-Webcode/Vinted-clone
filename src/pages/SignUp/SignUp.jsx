import "./signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import LogInput from "../../components/LogInput/LogInput";
import Button from "../../components/Button/Button";

const SignUp = ({ setUserToken }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newsLetter, setNewsLetter] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsLetter,
        },
      );
      // console.log(response.data);
      // account: {username: 'Dupond'}
      // email: "JeanDupond@hotmail.fr"
      // token: "AIptibQUy2U-dbGRNRJ2_RUcPjbOa6SnzJ5anWaJHNXX2qf1YFee82c6lhpIZkvE"
      // _id: "6b03554f61adf254fb045930"
      if (response.data.token) {
        Cookies.set("userToken", response.data.token, { expires: 7 });
        setUserToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      error.response
        ? setErrorMessage(error.response.data.message)
        : setErrorMessage(error.message);
    }
  };

  return (
    <>
      <main className="signup">
        <div className="container-signup">
          <form onSubmit={handleSubmit}>
            <h1>S'inscrire</h1>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />

            <LogInput
              type="email"
              placeholder="Email"
              value={email}
              setValue={setEmail}
              id="email"
            />
            <LogInput
              type="password"
              placeholder="Mot de passe"
              value={password}
              setValue={setPassword}
              id="password"
            />
            {errorMessage && <p className="error">{errorMessage}</p>}

            <div className="newsLetter">
              <input
                type="checkbox"
                name="newsLetter"
                id="newsLetter"
                checked={newsLetter}
                onChange={() => setNewsLetter(!newsLetter)}
              />
              <label htmlFor="newsLetter">S'inscrire à notre newsletter</label>
              <p>
                En m'inscrivant je confirme avoir lu et accepté les Termes &
                Conditions et Politique de Confidentialité de Vinted. Je
                confirme avoir au moins 18 ans.
              </p>
            </div>
            <Button text="S'inscrire" className="big-btn blue-btn" />
            <Link to="/login">
              <p>Tu as déja un compte ? Connecte-toi !</p>
            </Link>
          </form>
        </div>
      </main>
    </>
  );
};

export default SignUp;
