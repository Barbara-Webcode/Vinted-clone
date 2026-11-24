import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Offer from "./pages/Offer/Offer";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Cookies from "js-cookie";
import { useState } from "react";
import Publish from "./pages/Publish/Publish";

const App = () => {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);

  return (
    <>
      <Router>
        <Header
          userToken={userToken}
          setUserToken={setUserToken}
          title={title}
          setTitle={setTitle}
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home title={title} priceMin={priceMin} priceMax={priceMax} />
            }
          />
          <Route path="/offer/:id" element={<Offer />} />

          <Route
            path="/signup"
            element={<SignUp setUserToken={setUserToken} />}
          />
          <Route
            path="/login"
            element={<Login setUserToken={setUserToken} />}
          />
          <Route path="/publish" element={<Publish />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
